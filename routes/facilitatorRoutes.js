const express = require("express");
const {
  getFacDashboard,
  getFacilitatorCourses,
  getSpecificCourse,
  addClassLink,
  getFacilitatorDetails,
  getCourseStudents,
  scoreStudent
} = require("../controllers/facilitatorController");
const router = express.Router();

//facilitator dashboard
router.get("/dashboard/:id", getFacDashboard)

//get facilitator details
router.get("/getDetails/:id", getFacilitatorDetails);

//view courses
router.get("/courses/:id", getFacilitatorCourses);

//get a specific course
router.get("/course/:id", getSpecificCourse);

//add link for a course
router.patch("/addCourseLink/:id", addClassLink);

//get a course's students
router.get("/getCourseStudents/:id", getCourseStudents);

//score student
router.post("/scoreStudent", scoreStudent);

module.exports = router;
