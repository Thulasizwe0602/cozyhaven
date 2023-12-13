const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const router = express.Router();
const jwtSecret = 'cozyhaven';

router.get('/', (req, res) => {
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

module.exports = router;
