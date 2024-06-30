const mongoose = require("mongoose");



// Connect to MongoDB
mongoose
  .connect("mongodb+srv://madhammeenakumari:quiz@quizdb.a7rimx9.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });







// Define the LoginSchema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});




// Create the 'users' collection model
const User = mongoose.model("User", LoginSchema);

// Parse JSON request bodies






const MongoClient = require('mongodb').MongoClient;


module.exports = User;

