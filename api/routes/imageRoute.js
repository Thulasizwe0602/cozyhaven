const express = require('express');
const imagedownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// Endpoint to upload image by link
router.post('/uploadByLink', async (req, res) => {
  try {
    const { imageLink } = req.body;
    const newImageName = 'photo' + Date.now() + '.jpg';
    const imagePath = __dirname + '/../uploads/' + newImageName;
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

// Multer middleware for uploading photos
const photoMiddleware = multer({ dest: 'uploads/' });
router.post('/uploadPhotos', photoMiddleware.array('photos', 100), async (req, res) => {
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

module.exports = router;