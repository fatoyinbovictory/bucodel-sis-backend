const mongoose = require("mongoose");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Course } = require("../models/courseModel");
const { Score } = require("../models/scoreModel");

//display dashboard info
const getFacDashboard = async (req, res) => {
  const { id } = req.params;
  const facilitator = await Facilitator.findById(id).select({
    firstName: 1,
    courses: 1,
    phone: 1,
    email: 1
  });
  if (!facilitator) {
    res.status(404).json({ error: "Facilitator not found" });
  }
  res.status(200).json(facilitator);
};

//get facilitator details
const getFacilitatorDetails = async (req, res) => {
  const { id } = req.params;

  const facilitator = await Facilitator.findById(id).populate({
    path: "courses",
    select: { name: 1 }
  });

  if (!facilitator) {
    res.status(404).json({ message: "No Facilitator found" });
  }

  res.status(200).json(facilitator);
};

//Get facilitator's courses
const getFacilitatorCourses = async (req, res) => {
  const { id } = req.params;

  const courses = await Facilitator.findById(id)
    .select({
      courses: 1
    })
    .populate({
      path: "courses",
      select: { name: 1, courseCode: 1, creditHours: 1 }
    });

  if (!courses) {
    res.status(404).json({ message: "No Courses found" });
  }

  res.status(200).json(courses);
};

//Get facilitator's courses
const getSpecificCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    res.status(404).json({ message: "No Course found" });
  }

  res.status(200).json(course);
};

//add class link to course
const addClassLink = async (req, res) => {
  const { id } = req.params;
  const { classLink } = req.body;
  const course = await Course.findByIdAndUpdate(id, { classLink: classLink });
  if (!course) {
    res.status(404).json({ error: "No Course found" });
  }
  res.status(200).json({ message: "Course Link added" });
};

//get course students
const getCourseStudents = async (req, res) => {
  const { id } = req.params;

  const students = await Course.findById(id)
    .select({
      students: 1
    })
    .populate({
      path: "students",
      select: {
        firstName: 1,
        lastName: 1,
        program: 1,
        matricNo: 1,
        semesterId: 1
      },
      populate: {
        path: "semesterId",
        select: { isActive: 1 }
      }
    });
  if (!students) {
    res.status(404).json({ error: "No Students found" });
  }
  res.status(200).json(students);
};

//score student
const scoreStudent = async (req, res) => {
  const { studentId, courseId, score, semesterId } = req.body;
  try {
    await Score.postScore(studentId, courseId, score, semesterId);
    res.status(200).json({ message: "Student Scored Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFacDashboard,
  getFacilitatorCourses,
  getSpecificCourse,
  addClassLink,
  getFacilitatorDetails,
  getCourseStudents,
  scoreStudent
};
