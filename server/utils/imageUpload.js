const { Storage } = require('@google-cloud/storage');

// Replace with your downloaded JSON key file path
const serviceAccountPath = '../Secrets/prismatic-grail-412017-44848757bed4.json';

async function uploadImage(imageFile) {
  try {
    const storage = new Storage({
      keyFilename: serviceAccountPath
    });

    // Replace with your bucket name
    const bucketName = 'build-for-bharat-images';
    const bucket = storage.bucket(bucketName);

    // Generate a unique filename (optional)
    const filename = `${Date.now()}-${imageFile.originalname}`;
    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype
      }
    });

    const uploadPromise = new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${filename}`; // Fixed URL construction
        resolve({
          imageUrl: imageUrl,
          filename: filename
        });
      });

      stream.end(imageFile.buffer); // Use imageFile.buffer
    });

    return uploadPromise;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Or handle the error appropriately
  }
}

module.exports = { uploadImage };
