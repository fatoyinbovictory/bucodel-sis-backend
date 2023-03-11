const express = require("express");
const {
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator
} = require("../controllers/adminController");
const router = express.Router();

//get all students
router.get("/students", getStudents);

//create facilitator
router.post("/createFacilitator", createFacilitator);

//get specific student
router.get("/getStudent/:id", getStudent);

module.exports = router;
