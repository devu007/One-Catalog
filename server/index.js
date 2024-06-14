const express = require("express");
const { createServer } = require("http");
require("dotenv").config();
const app = express();
const server = createServer(app);

const cors = require("cors");
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const imageEditRouter = require("./routes/imageEdit.router");
const imageUploadRouter = require("./routes/imageUpload.router");
const imageAnalysisRouter = require("./routes/imageAnalysis.router");
const kindleRouter = require("./routes/kindle.router");
const { connectToMongoDB } = require("./utils/mongo");

// Middleware
app.use(express.json());
app.use(cors());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/image/edit", imageEditRouter);
app.use("/image/upload", imageUploadRouter);
app.use("/image/analysis", imageAnalysisRouter);
app.use("/kindle", kindleRouter); // Add the Kindle router

app.get("/", (req, res) => {
  res.json({ ans: "SERVER IS RUNNING" });
});

// Database connection
const startServer = async () => {
  try {
    await connectToMongoDB(process.env.DB_URI);
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 3002;
    server.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
  });
  console.error(error);
});

startServer();
