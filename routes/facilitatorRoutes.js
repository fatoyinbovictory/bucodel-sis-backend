const express = require("express");
const {
  getFacilitatorCourses,
  getSpecificCourse,
  addClassLink,
  getFacilitatorDetails,
  getCourseStudents
} = require("../controllers/facilitatorController");
const router = express.Router();

//get facilitator details
router.get("/getDetails/:id", getFacilitatorDetails);

//view courses
router.get("/courses/:id", getFacilitatorCourses);

router.get("/course/:id", getSpecificCourse);

router.patch("/addCourseLink/:id", addClassLink);

router.get("/getCourseStudents/:id", getCourseStudents);

module.exports = router;
