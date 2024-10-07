const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const authRoute = require('./router/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Mongoose setup
const PORT = process.env.PORT || 3030;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

// Routes
app.use("/", authRoute);

// Server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT || PORT}`);
});

module.exports = upload; 
