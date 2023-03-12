const mongoose = require("mongoose");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Program } = require("../models/programModel");
const { Course } = require("../models/courseModel");

//get all students
const getStudents = async (req, res) => {
  const students = await Student.find({}).select({
    firstName: 1,
    lastName: 1,
    program: 1,
    matricNo: 1,
    email: 1,
    phone: 1
  });
  res.status(200).json(students);
};

//get specific student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findById(id);

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json(student);
};

//approve student application
const approveStudentApp = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      isApproved: true
    }
  );

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }
  res.status(200).json(student);
};

//decline student application
const declineStudentApp = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json({ message: "Deleted successfully" });
};

//create facilitator
const createFacilitator = async (req, res) => {
  const { password, firstName, lastName, email, phone } = req.body;
  try {
    const facilitator = await Facilitator.createF(
      password,
      firstName,
      lastName,
      email,
      phone
    );
    res.status(200).json({
      message: "Facilitator created successfully",
      email,
      _id: facilitator._id
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//create program
const createProgram = async (req, res) => {
  const {
    name,
    programCode,
    duration,
    certification,
    programFee,
    programHead
  } = req.body;
  try {
    const program = await Program.createProgram(
      name,
      programCode,
      duration,
      certification,
      programFee,
      programHead
    );
    res.status(200).json({
      message: "Program created successfully",
      name,
      _id: program._id
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//create course
const createCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No program found" });
  }
  const { name, courseCode, creditHours, courseFacilitator } = req.body;
  const program = id;
  try {
    const course = await Course.createCourse(
      name,
      courseCode,
      creditHours,
      courseFacilitator,
      program
    );
    res.status(200).json({
      message: "Course created successfully",
      name,
      _id: course._id
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//get a programs courses
const getCourses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No courses found" });
  }

    const courses = await Course.find({ program: id});

    if (!courses) {
      res.status(404).json({ error: "No courses found" });
    }

    res.status(200).json(courses);
};

module.exports = {
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  declineStudentApp,
  createProgram,
  createCourse,
  getCourses
};

// const newCourse = {
//   name,
//   courseCode,
//   creditHours,
//   courseFacilitator,
//   program: id
// };
// const course = await Program.findByIdAndUpdate(
//   { _id: id },
//   {
//     $push: { programCourses: newCourse }
//   }
// );
