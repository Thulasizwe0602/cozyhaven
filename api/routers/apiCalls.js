const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const router = express.Router();
const jwtSecret = 'cozyhaven';

router.post('/signup', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (name === '' || email === '' || password === '') {
      response.status(500).json({ errorTitle: 'Sign up failed', errorMessage: 'Missing Information' });
    } else {
      const hashedPassword = await bcrypt.hashSync(password, 6);
      // const userDoc = await User.create({ name, email, password: hashedPassword });
      // response.status(201).json({ data: userDoc, message: 'User created successfully' });
      response.status(201).json({ message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

router.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;
    if (email === '' || password === '') {
      response.status(500).json({ errorTitle: 'Sign in failed', errorMessage: 'Missing Information' });
    } else {
      const userDoc = await User.findOne({ email });
      if (userDoc) {
        const validPassword = bcrypt.compareSync(password, userDoc.password);
        if (validPassword) {
          jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
            if (error) {
              throw error;
            }
            response.cookie('token', token).status(200).json('User signed in successfully');
          });
        } else {
          response.status(400).json({ message: 'Incorrect email or password!!' });
        }
      }
      response.status(400).json({ message: 'Incorrect email or password!!' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    response.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

module.exports = router;
