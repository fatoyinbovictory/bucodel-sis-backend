const express = require("express");
const router = express.Router();
const {
  createStudent,
  loginStudent,
  loginFacilitator
} = require("../controllers/auth/authController");

router.post("/register", createStudent);

router.post("/loginStudent", loginStudent);

router.post("/loginFacilitator", loginFacilitator);

module.exports = router;
