require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const imageEditRouter = require("./routes/imageEdit.router");
const imageUploadRouter = require("./routes/imageUpload.router");
const imageAnalysisRouter = require("./routes/imageAnalysis.router");
const { connectToMongoDB } = require("./utils/mongo");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/image/edit", imageEditRouter);
app.use("/image", imageUploadRouter);
app.use("/image/analysis", imageAnalysisRouter);

app.get("/", (req, res) => {
  res.json({ ans: "SERVER IS RUNNING" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

const startServer = async () => {
  try {
    await connectToMongoDB(
      "mongodb+srv://onecatalog:genvision007@cluster0.wygz8lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

startServer();

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
  });
  console.error(error);
});
