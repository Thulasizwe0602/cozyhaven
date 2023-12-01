const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User.js');

dotenv.config();

const app = express();
const PORT = 3000;
const CORS_OPTIONS = {
  credentials: true,
  origin: 'http://localhost:5173'
};

app.use(express.json());
app.use(cors(CORS_OPTIONS));

 mongoose.connect(process.env.MONGO_URL);

app.get('/test', (request, response) => {
  response.json('test changed 44');
});

app.post('/signup', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (name == '' || email == '' || password == '') {
        response.status(500).json({ errorTitle: 'Sign up failed', errorMessage:'Missing Information' });
    } else {
        const hashedPassword = await bcrypt.hashSync(password, 6);
        const userDoc = await User.create({ name, email, password: hashedPassword });
        response.status(201).json({ data:userDoc, message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });


  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
