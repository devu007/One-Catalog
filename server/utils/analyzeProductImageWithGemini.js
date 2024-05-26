const { ImageAnnotatorClient } = require('@google-cloud/vision'); // Replace with your GCP library
const searchWithPrompt = require('./searchWithPrompt');
// Replace with your project ID
const projectId = 'prismatic-grail-412017';

// Replace with your service account JSON key file path
const serviceAccountPath = '../Secrets/prismatic-grail-412017-44848757bed4.json';

async function analyzeProductImageWithGemini(imageUrl, prompt) {
  try {
    // Create Vision AI client
    const client = new ImageAnnotatorClient({
      credentials: require(serviceAccountPath),
      projectId,
    });

    // (Optional) Analyze the image using Vision AI
    let imageDescription = '';
    if (imageUrl) {
      const [response] = await client.textDetection(imageUrl);
      imageDescription = response.fullTextAnnotation.text.toLowerCase(); // Extract text from the image
    }

    prompt += imageDescription;

    let responseText=searchWithPrompt(prompt);

    // callGeminiAPI(prompt)
    // .then(response => responseText = response)
    // .catch(error => console.error(error));

    return responseText;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error; // Or handle the error appropriately
  }
}

module.exports = analyzeProductImageWithGemini;
