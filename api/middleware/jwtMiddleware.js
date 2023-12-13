const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const jwtSecret = 'cozyhaven';

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.userData = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    req.userData = user;
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    req.userData = null;
    next();
  }
};

module.exports = authenticateToken;
