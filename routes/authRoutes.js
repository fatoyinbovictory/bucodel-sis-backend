const express = require("express");
const router = express.Router();
const { createStudent, loginStudent } = require("../controllers/auth/authController");

router.post("/register", createStudent);

router.post("/loginStudent", loginStudent);

module.exports = router;
