const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads

// Set up multer to store the file in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadImage } = require('../utils/imageUpload');

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const uploadedImage = await uploadImage(req.file);
    res.json({ message: 'Image uploaded successfully!', data: uploadedImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

module.exports = router;
