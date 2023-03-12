const express = require("express");
const router = express.Router();
const {
  createStudent,
  loginStudent,
  loginFacilitator,
  loginAdmin
} = require("../controllers/auth/authController");

//student apply
router.post("/register", createStudent);

//login student
router.post("/loginStudent", loginStudent);

//login facilitator
router.post("/loginFacilitator", loginFacilitator);

//login admin
router.post("/loginAdmin", loginAdmin);

module.exports = router;
