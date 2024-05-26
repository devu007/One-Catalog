const { default: mongoose } = require("mongoose");
async function connectToMongoDB(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
      }); 
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); 
    }
}
module.exports = {connectToMongoDB}