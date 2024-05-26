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
const { connectToMongoDB } = require("./utils/mongo");

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use('/user',productRouter);
app.use('/user',imageEditRouter);
app.use('/user',imageUploadRouter)
app.use('/user',imageAnalysisRouter)

app.get("/", (req, res) => {
  res.json({ ans: "SERVER IS RUNNING" });
});

try{
  connectToMongoDB(process.env.DB_URI);
}
catch(err){
  console.log(err.message)
}
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
  });
  console.log(error);
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});