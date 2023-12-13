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
const Accomodation = require('./models/Accomodation.js');

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

// Test endpoint
app.get('/test', (req, res) => {
  res.json('test number ' + Math.random());
});

// User signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name === '' || email === '' || password === '') {
      res.status(500).json({ errorTitle: 'Sign up failed', errorMessage: 'Missing Information' });
    } else {
      const hashedPassword = await bcrypt.hashSync(password, 6);
      const userDoc = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ data: userDoc, message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

// User signin endpoint
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      res.status(500).json({ errorTitle: 'Sign in failed', errorMessage: 'Missing Information' });
    } else {
      const userDoc = await User.findOne({ email });
      if (userDoc) {
        const validPassword = bcrypt.compareSync(password, userDoc.password);
        if (validPassword) {
          jwt.sign({ name: userDoc.name, email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
            if (error) {
              throw error;
            }
            res.cookie('token', token).status(200).json({ email: userDoc.email, id: userDoc._id, name: userDoc.name });
          });
        } else {
          res.status(400).json({ message: 'Incorrect email or password!!' });
        }
      } else {
        res.status(400).json({ message: 'No user found' });
      }
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

// User signout endpoint
app.post('/signout', async (req, res) => {
  try {
    res.cookie('token', '').json(true);
  } catch (error) {
    console.error('Error during sign out', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

// User profile endpoint
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, cookieUserData) => {
      if (error) {
        throw error;
      }
      const { id, name, email } = await User.findById(cookieUserData.id);
      res.json({ id, name, email });
    });
  } else {
    res.json('null');
  }
});

// Upload image by link endpoint
app.post('/uploadByLink', async (req, res) => {
  try {
    const { imageLink } = req.body;
    const newImageName = 'photo' + Date.now() + '.jpg';
    const imagePath = __dirname + '/uploads/' + newImageName;
    await imagedownloader.image({
      url: imageLink,
      dest: imagePath
    });
    res.json(newImageName);
  } catch (error) {
    console.error('Error during image upload by link:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

// Add accommodation endpoint
app.post('/addAccomodation', async (req, res) => {
  try {
    const { title, address, description, extraInfo, checkIn, checkOut, maxGuest, photoLink, addedPhotos, indoorFeatures, outdoorFeatures } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, cookieUserData) => {
      if (error) {
        throw error;
      }
      const accomodationDoc = await Accomodation.create({
        owner: cookieUserData.id,
        title,
        address,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        photoLink,
        photos: addedPhotos,
        indoorFeatures,
        outdoorFeatures
      });
      res.status(201).json({ data: accomodationDoc, message: 'Accommodation created successfully' });
    });
  } catch (error) {
    console.error('Error during accommodation creation:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

// Multer middleware for uploading photos
const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/uploadPhotos', photoMiddleware.array('photos', 100), async (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const splitArray = originalname.split('.');
      const ext = splitArray[splitArray.length - 1];
      const newName = path + '.' + ext;
      fs.renameSync(path, newName);
      const renamedFile = newName.replace('uploads\\', '');
      uploadedFiles.push(renamedFile);
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.error('Error during photo upload:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
