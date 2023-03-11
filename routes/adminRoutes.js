const express = require("express");
const {
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  declineStudentApp,
  createProgram,
  createCourse
} = require("../controllers/adminController");
const router = express.Router();

//get all students
router.get("/students", getStudents);

//create facilitator
router.post("/createFacilitator", createFacilitator);

//get specific student
router.get("/getStudent/:id", getStudent);

//approve a student application
router.patch("/approveStudentApp/:id", approveStudentApp);

//decline student application
router.delete("/declineStudentApp/:id", declineStudentApp);

//create a program
router.post("/createProgram", createProgram);

//create a course
router.patch("/createCourse/:id", createCourse);

module.exports = router;
