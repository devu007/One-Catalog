const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Image = require("../model/Image");
const express = require("express");
const router = express.Router();
const multer = require("multer"); // For file uploads

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const buckeName = "mocko.ai";
const bucketRegion = "us-east-1";

const s3 = new S3Client({
  region: bucketRegion,
});

// Set up multer to store the file in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const imageName = randomImageName();
    const params = {
      Bucket: buckeName,
      Key: imageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    const newImage = new Image({
      name: imageName,
      contentType: req.file.mimetype,
    });

    await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

module.exports = router;
