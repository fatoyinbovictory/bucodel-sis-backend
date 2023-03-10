const express = require("express");
const router = express.Router();
const { createStudent } = require("../controllers/auth/authController");

router.post("/register", createStudent);

module.exports = router;