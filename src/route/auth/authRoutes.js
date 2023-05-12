const express = require("express");
const { getRegister } = require("../../controller/auth/authController");

const authRoutes = express.Router();

authRoutes.get("/", getRegister);

module.exports = authRoutes;
