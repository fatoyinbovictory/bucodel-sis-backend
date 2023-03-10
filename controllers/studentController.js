const mongoose = require("mongoose");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Program } = require("../models/programModel");
const { Course } = require("../models/courseModel");
const { Semester } = require("../models/semesterModel");

//get details
const getStudentDetails = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).select({
    firstName: 1,
    lastName: 1,
    program: 1,
    matricNo: 1,
    email: 1,
    phone: 1,
    sex: 1,
    nationality: 1,
    address: 1,
    isApproved: 1
  });
  try {
    if (!student.isApproved) {
      res.status(400).json({
        error: "Your application has not been approved, please check back later"
      });
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    if (!student) {
      res.status(404).json({ error: "student not found" });
    } else {
      res.status(400).json(error.message);
    }
  }
};

//get semesters
const getSemesters = async (req, res) => {
  const semesters = await Semester.find({});
  if (!semesters) {
    res.status(404).json({ error: "No semesters founf" });
  }
  res.status(200).json(semesters);
};

//select semester
const selectSemester = async (req, res) => {
  const { id } = req.params;
  const { semester, session } = req.body;
  const selectedSem = semester.concat(".", session);
  try {
    await Student.findByIdAndUpdate(id, { semester: selectedSem });
    res.status(200).json({ message: "Semester successfully selected" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//add a course
const addCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(studentId) ||
    !mongoose.Types.ObjectId.isValid(courseId)
  ) {
    res.status(404).json({ error: "Student and/or Course not found" });
  }
  try {
    await Student.findByIdAndUpdate(
      { _id: studentId },
      {
        $push: { courses: courseId }
      }
    );
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { students: studentId }
      }
    );
    res.status(200).json({
      message: "Course added successfully"
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//view selected courses
const viewSelectedCourses = async (req, res) => {
  const { id } = req.params;
  const courses = await Student.findById(id)
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

//submit registration
const submitRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndUpdate(id, {
      isRegistering: true
    });
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addCourse,
  getStudentDetails,
  getSemesters,
  selectSemester,
  viewSelectedCourses,
  submitRegistration
};
