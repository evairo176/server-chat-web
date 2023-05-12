const multer = require("multer");
// const sharp = require("sharp");
// const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/users"); // Specify the directory where you want to save the uploaded images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// Create the Multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
