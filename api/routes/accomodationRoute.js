const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Accomodation = require('../models/Accomodation.js');

const router = express.Router();

router.post('/addAccomodation', authenticateToken, async (req, res) => {
  try {
    const { title, address, description, extraInfo, checkIn, checkOut, maxGuest, photoLink, addedPhotos, indoorFeatures, outdoorFeatures } = req.body;
    const userData = req.userData;

    if (!userData) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const accomodationDoc = await Accomodation.create({
      owner: userData.id,
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
  } catch (error) {
    console.error('Error during accommodation creation:', error);
    res.status(500).json({ errorTitle: 'Internal Server Error', errorMessage: error });
  }
});

module.exports = router;
