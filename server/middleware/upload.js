const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the defined upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
