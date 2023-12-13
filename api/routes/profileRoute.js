const express = require('express');
const jwtMiddleware = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/', jwtMiddleware, (req, res) => {
  const userData = req.userData;

  if (userData) {
    res.json({
      id: userData.id,
      name: userData.name,
      email: userData.email
    });
  } else {
    res.json('null');
  }
});

module.exports = router;
