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
  getCourses,
  createSemester,
  getAppStudents,
  getRegStudents,
  approveStudentReg
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

//get students awaiting approval
router.get("/getAppStudents", getAppStudents);

//approve a student application
router.patch("/approveStudentApp/:id", approveStudentApp);

//get students awaiting registration
router.get("/getRegStudents", getRegStudents);

//approve a student registration
router.patch("/approveStudentReg/:id", approveStudentReg);

//decline student application
router.delete("/declineStudentApp/:id", declineStudentApp);

//create a program
router.post("/createProgram", createProgram);

//create a course
router.post("/createCourse/:id", createCourse);

//get courses for a program
router.get("/getCourses/:id", getCourses);

//create a semester
router.post("/createSemester", createSemester);

module.exports = router;
