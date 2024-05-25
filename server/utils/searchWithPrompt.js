const axios = require('axios');

async function searchWithPrompt(prompt) {
  const apiKey = process.env.GEMINI_API_KEY; // Assuming API key stored in environment variable

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable');
  }

  const data = JSON.stringify({
    contents: [
      {
        parts: [
          { text: prompt },
        ],
      },
    ],
  });

  const config = {
    method: 'post',
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data; // Return the full response object
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return null; // Or return a specific error message
  }
}

// Export the function using the preferred approach (choose one)
module.exports = searchWithPrompt;  // Traditional approach

// OR (ES6+)
// export default callGeminiAPI;  // ES6 export syntax
