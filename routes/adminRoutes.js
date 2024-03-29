const express = require("express");
const {
  createAdmin,
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  declineStudentApp,
  getStudentCourses,
  createProgram,
  createCourse,
  getCourses,
  createSemester,
  getAppStudents,
  getRegStudents,
  approveStudentReg,
  getPayStudents,
  approveStudentPay,
  getPrograms,
  getSpecificProgram,
  getDashboard,
  getDetails,
  getFacIds,
  deleteFacilitator,
  declineStudentReg,
  declineStudentPay,
  addCourseTime,
  viewSemesters,
  makeSemActive,
  endSem,
  createNews,
  viewAllNews,
  viewNews,
  updateNews,
  deleteNews,
  createStudent
} = require("../controllers/adminController");
const router = express.Router();

//get dashboard
router.get("/dashboard/:id", getDashboard);

//get details
router.get("/getDetails/:id", getDetails);

//create admin
router.post("/createAdmin", createAdmin);

//get all programs
router.get("/programs", getPrograms);

//get specific program
router.get("/program/:id", getSpecificProgram);

//get all students
router.get("/students", getStudents);

//get facilitator ids
router.get("/facilitatorIds", getFacIds);

//create facilitator
router.post("/createFacilitator", createFacilitator);

//delete facilitator
router.delete("/deleteFacilitator", deleteFacilitator);

//get specific student
router.get("/getStudent/:id", getStudent);

//get students awaiting approval
router.get("/getAppStudents", getAppStudents);

//approve a student application
router.patch("/approveStudentApp/:id", approveStudentApp);

//decline student application
router.post("/declineStudentApp/:id", declineStudentApp);

//get students awaiting registration
router.get("/getRegStudents", getRegStudents);

//approve a student registration
router.patch("/approveStudentReg/:id", approveStudentReg);

//decline student registration
router.patch("/declineStudentReg/:id", declineStudentReg);

//get students awaiting payment approval
router.get("/getPayStudents", getPayStudents);

//approve a student payment
router.patch("/approveStudentPay/:id", approveStudentPay);

//decline student payment
router.patch("/declineStudentPay/:id", declineStudentPay);

//create a program
router.post("/createProgram", createProgram);

//add course time
router.patch("/addCourseTime/:id", addCourseTime);

//create a course
router.post("/createCourse/:id", createCourse);

//get courses for a program
router.get("/getCourses/:id", getCourses);

//get a specifc student's courses
router.get("/getStudentCourses/:id", getStudentCourses);

//create a semester
router.post("/createSemester", createSemester);

//view semesters
router.get("/viewSemesters", viewSemesters);

//make semester active
router.patch("/makeSemActive/:id", makeSemActive);

//end semester
router.patch("/endSemester/:id", endSem);

//view all news posts
router.get("/viewAllNews", viewAllNews);

//view specific news post
router.get("/viewNews/:id", viewNews);

//create news post
router.post("/postNews", createNews);

//update news post
router.patch("/updateNews/:id", updateNews);

//delete news post
router.delete("/deleteNews/:id", deleteNews);

router.post("/createStudent", createStudent);

module.exports = router;
