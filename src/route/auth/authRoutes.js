const express = require("express");
const { registerController } = require("../../controller/auth/authController");
// const {
//   photoUpload,
//   postImgResize,
// } = require("../../middleware/uploads/photoUpload");
const upload = require("../../middleware/uploads/photoUpload");

const authRoutes = express.Router();

authRoutes.post("/register", upload.single("image"), registerController);

module.exports = authRoutes;
