const express = require('express');
const jwt = require('jsonwebtoken');
const Accomodation = require('../models/Accomodation.js');

const router = express.Router();
const jwtSecret = 'cozyhaven';

router.post('/addAccomodation', async (req, res) => {
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

module.exports = router;
