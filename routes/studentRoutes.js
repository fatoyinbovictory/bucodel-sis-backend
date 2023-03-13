const express = require("express");
const router = express.Router();
const {
  addCourse,
  getStudentDetails,
  selectSemester,
  getSemesters,
  viewSelectedCourses,
  submitRegistration
} = require("../controllers/studentController");

//get student details
router.get("/getDetails/:id", getStudentDetails);

//register for course
router.post("/addCourse/", addCourse);

//get available semesters
router.get("/getSemesters", getSemesters);

//select semester
router.patch("/selectSemester/:id", selectSemester);

//view selected courses
router.get("/viewSelectedCourses/:id", viewSelectedCourses);

//submit registration
router.patch("/submitRegistration/:id", submitRegistration);

module.exports = router;
