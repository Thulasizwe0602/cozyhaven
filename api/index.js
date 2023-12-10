const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const imagedownloader = require('image-downloader');

const User = require('./models/User.js');

dotenv.config();

const app = express();
const PORT = 3000;
const jwtSecret = 'cozyhaven';
const CORS_OPTIONS = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors(CORS_OPTIONS));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (request, response) => {
  response.json('test number ' + Math.random());
});

app.post('/signup', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (name == '' || email == '' || password == '') {
      response.status(500).json({ errorTitle: 'Sign up failed', errorMessage: 'Missing Information' });
    } else {
      const hashedPassword = await bcrypt.hashSync(password, 6);
      const userDoc = await User.create({ name, email, password: hashedPassword });
      response.status(201).json({ data: userDoc, message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

app.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;

    if (email === '' || password === '') {
      response.status(500).json({ errorTitle: 'Sign in failed', errorMessage: 'Missing Information' });
    } else {
      const userDoc = await User.findOne({ email });
      if (userDoc) {
        const validPassword = bcrypt.compareSync(password, userDoc.password);
        if (validPassword) {
          jwt.sign({ name: userDoc.name, email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
            if (error) {
              throw error;
            }
            response.cookie('token', token).status(200).json({ email: userDoc.email, id: userDoc._id, name: userDoc.name });
          });
        } else {
          response.status(400).json({ message: 'Incorrect email or password!!' });
        }
      } else {
        response.status(400).json({ message: 'No user found' });
      }
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

app.post('/signout', async (request, response) => {
  try {
    response.cookie('token', '').json(true);
  } catch (error) {
    console.error('Error during signin out', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

app.get('/profile', (request, response) => {
  const { token } = request.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, cookieUserData) => {
      if (error) {
        throw error;
      }
      const { id, name, email } = await User.findById(cookieUserData.id);
      response.json({ id, name, email });
    })
  } else {
    response.json('null');
  }
});

app.post('/uploadByLink', async (request, response) => {
  const { imageLink } = request.body;
  const newImageName = 'photo' + Date.now() + '.jpg';
  const imagePath = __dirname + '/uploads/' + newImageName;
  await imagedownloader.image({
    url: imageLink,
    dest: imagePath
  })
  response.json(newImageName);
})

const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/uploadPhotos', photoMiddleware.array('photos', 100), async (request, response) => {
const uploadedFiles =[];
console.log(request.files[0]);
  for (let i = 0; i < request.files.length; i++) {
    const { path, originalname } = request.files[i];  
    const splitArray = originalname.split('.');
    const ext = splitArray[splitArray.length - 1]
    const newName = path + '.' + ext;
    fs.renameSync(path, newName);
    let renamedFile = newName.replace('uploads\\','');
    uploadedFiles.push(renamedFile);
  }
  response.json(uploadedFiles);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
