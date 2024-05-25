const express = require('express');
const analyzeProductImage = require('../utils/analyzeProductImage'); // Import the function
const analyzeProductImageWithGemini = require('../utils/analyzeProductImageWithGemini');

const router = express.Router();

router.post('/analyze-product', async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl && !prompt) {
      return res.status(400).send('Missing required fields: imageUrl and prompt');
    }
    
    if (!imageUrl) {
        return res.status(400).send('Missing required fields: imageUrl');
    }

      
    if (!prompt) {
        return res.status(400).send('Missing required fields: prompt');
      }

    const response = await analyzeProductImage(imageUrl, prompt);
    res.json({ message: response });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/get-description', async (req, res) => {
    try {
      const { imageUrl, prompt } = req.body;
  
      if (!imageUrl && !prompt) {
        return res.status(400).send('Missing required fields: imageUrl and prompt');
      }
  
      if (!imageUrl) {
        return res.status(400).send('Missing required fields: imageUrl');
      }
  
      if (!prompt) {
        return res.status(400).send('Missing required fields: prompt');
      }
  
      const response = await analyzeProductImageWithGemini(imageUrl, prompt);
      res.json({ message: response.candidates[0].content.parts[0].text });
    } catch (error) {
      console.error('Error analyzing image:', error);
      res.status(500).send('Internal server error');
    }
  });

  
router.post('/get-prefill-data', async (req, res) => {
    try {
      const { imageUrl, prompt } = req.body;
  
      if (!imageUrl && !prompt) {
        return res.status(400).send('Missing required fields: imageUrl and prompt');
      }
  
      if (!imageUrl) {
        return res.status(400).send('Missing required fields: imageUrl');
      }
  
      if (!prompt) {
        return res.status(400).send('Missing required fields: prompt');
      }
  
      const response = await analyzeProductImageWithGemini(imageUrl, prompt);
      res.json({ message: response.candidates[0].content.parts[0].text });
    } catch (error) {
      console.error('Error analyzing image:', error);
      res.status(500).send('Internal server error');
    }
  });


module.exports = router;
