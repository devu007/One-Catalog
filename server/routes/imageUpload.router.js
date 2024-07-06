const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Image = require("../model/Image");
const express = require("express");
const router = express.Router();
const multer = require("multer"); // For file uploads
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = "mocko.ai";
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
      Bucket: bucketName,
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

router.delete("/image-upload/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Image.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Image not found" });
    }
    const deleteParams = {
      Bucket: bucketName,
      Key: post.name,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);

    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image" });
  }
});

router.put("/update-image/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Image.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Image not found" });
    }

    const newImageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: newImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const deleteParams = {
      Bucket: bucketName,
      Key: post.name,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);

    post.name = newImageName;
    post.contentType = req.file.mimetype;
    await post.save();

    res
      .status(200)
      .json({ message: "Image updated successfully", image: post });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Error updating image" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("Request received for ID:", req.params.id); // Debugging line
    const post = await Image.findById(req.params.id);

    if (!post) {
      console.log("Image not found"); // Debugging line
      return res.status(404).json({ message: "Image not found" });
    }

    const params = {
      Bucket: bucketName,
      Key: post.name,
    };

    console.log("Params for S3 get object command:", params); // Debugging line
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    console.log("Generated signed URL:", url); // Debugging line
    res.status(200).json({ image: post, url: url });
  } catch (error) {
    console.error("Error getting image:", error);
    res
      .status(500)
      .json({ message: "Error getting image", error: error.message });
  }
});

module.exports = router;
