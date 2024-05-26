const { ImageAnnotatorClient } = require('@google-cloud/vision'); // Replace with your GCP library

// Replace with your project ID
const projectId = 'prismatic-grail-412017';

// Replace with your service account JSON key file path
const serviceAccountPath = process.env.PATH;

async function analyzeProductImage(imageUrl, prompt) {
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

    // Generate the response based on the prompt and image content
    let responseText = `Here's a very short description of the product visually:\n`;

    // Use the prompt and imageDescription to create the response
    if (imageDescription) {
      responseText += `* ${imageDescription}`;
    } else {
      responseText += '* I couldn\'t detect any text in the image.';
    }

    return responseText;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error; // Or handle the error appropriately
  }
}

module.exports = analyzeProductImage;
