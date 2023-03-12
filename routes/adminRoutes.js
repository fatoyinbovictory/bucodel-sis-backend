const express = require("express");
const {
  createAdmin,
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  declineStudentApp,
  createProgram,
  createCourse,
  getCourses
} = require("../controllers/adminController");
const router = express.Router();

//create admin
router.post("/createAdmin", createAdmin);

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
router.post("/createCourse/:id", createCourse);

//get courses for a program
router.get("/getCourses/:id", getCourses);

module.exports = router;
