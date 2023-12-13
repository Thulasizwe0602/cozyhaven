const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();
const jwtSecret = 'cozyhaven';

router.post('/signup', async (req, res) => {
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

router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email)
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

router.post('/signout', async (req, res) => {
    try {
      res.cookie('token', '').json(true);
    } catch (error) {
      console.error('Error during sign out', error);
      res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
    }
});

module.exports = router;
