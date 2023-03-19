const express = require("express");
const router = express.Router();
const {
  addCourse,
  getStudentDetails,
  selectSemester,
  getSemesters,
  viewSelectedCourses,
  submitRegistration,
  feePayment,
  viewResults,
  getStudentDashboard,
  getPrograms,
  getCourses,
  removeCourse,
  getFees,
  getSpecificCourse,
  getRegStatus
} = require("../controllers/studentController");

//get student dashboard
router.get("/dashboard/:id", getStudentDashboard);

//get student details
router.get("/getDetails/:id", getStudentDetails);

//get programs
router.get("/programs", getPrograms);

//get a programs courses
router.get("/getCourses/:id", getCourses);

//get specific course
router.get("/course/:id", getSpecificCourse)

//register for course
router.patch("/addCourse/", addCourse);

//remove a course
router.patch("/removeCourse", removeCourse);

//get available semesters
router.get("/getSemesters", getSemesters);

//select semester
router.patch("/selectSemester/:id", selectSemester);

//view selected courses
router.get("/viewSelectedCourses/:id", viewSelectedCourses);

//submit registration
router.patch("/submitRegistration/:id", submitRegistration);

//get fees
router.post("/getFees", getFees);

//get Registration status
router.get('/getStatus/:id', getRegStatus)

//submit fee payment application
router.patch("/feePayment/:id", feePayment);

//view results
router.get("/viewResults/:id", viewResults);

module.exports = router;
