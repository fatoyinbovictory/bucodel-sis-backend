const mongoose = require("mongoose");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Program } = require("../models/programModel");
const { Course } = require("../models/courseModel");
const { Admin } = require("../models/adminModel");
const { Semester } = require("../models/semesterModel");

//get dashboard
const getDashboard = async (req, res) => {
  const { id } = req.params;
  try {
    const adminName = await Admin.findById(id).select({ firstName: 1 });
    const students = await Student.countDocuments({ isApproved: true });
    const facilitators = await Facilitator.countDocuments();
    const programs = await Program.countDocuments();
    res.status(200).json({
      adminName,
      students,
      programs,
      facilitators
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get details
const getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const approvedStudents = await Student.countDocuments({ isApproved: true });
    const registeredStudents = await Student.countDocuments({
      isRegistered: true
    });
    const appliedStudents = await Student.countDocuments({ isApproved: false });
    const facilitators = await Facilitator.countDocuments();
    const programs = await Program.countDocuments();
    const admin = await Admin.findById(id).select({
      firstName: 1,
      lastName: 1,
      email: 1,
      phone: 1
    });
    res.status(200).json({
      admin,
      approvedStudents,
      registeredStudents,
      appliedStudents,
      facilitators,
      programs
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create admin
const createAdmin = async (req, res) => {
  const { password, firstName, lastName, email, phone } = req.body;
  try {
    const admin = await Admin.createA(
      password,
      firstName,
      lastName,
      email,
      phone
    );
    res.status(200).json({
      message: "Admin created successfully",
      email,
      _id: admin._id
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//get all programs
const getPrograms = async (req, res) => {
  const programs = await Program.find({}).select({
    name: 1,
    programCourses: 1,
    duration: 1,
    certification: 1
  });
  if (!programs) {
    res.status(404).json({ error: "No programs found" });
  }
  res.status(200).json(programs);
};

//get a single program
const getSpecificProgram = async (req, res) => {
  const { id } = req.params;

  const program = await Program.findById(id)
    .populate({
      path: "programCourses",
      select: { name: 1, courseCode: 1, creditHours: 1 }
    })
    .populate({
      path: "programHead",
      select: { firstName: 1, lastName: 1 }
    });
  if (!program) {
    res.status(404).json({ error: "Program not found" });
  }
  res.status(200).json(program);
};

//get all students
const getStudents = async (req, res) => {
  const students = await Student.find({ isApproved: true }).select({
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

//get all students awaiting application approval
const getAppStudents = async (req, res) => {
  const students = await Student.find({ isApproved: false }).select({
    firstName: 1,
    lastName: 1,
    program: 1,
    sex: 1
  });

  if (!students) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json(students);
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
  res.status(200).json({ message: "Approved successfully" });
};

//get all students awaiting registration approval
const getRegStudents = async (req, res) => {
  const students = await Student.find({
    isRegistering: true,
    isPaid: true
  }).select({
    firstName: 1,
    lastName: 1,
    program: 1,
    semester: 1
  });

  if (!students) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json(students);
};

//approve student registration
const approveStudentReg = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      isRegistering: false,
      isRegistered: true
    }
  );

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }
  res.status(200).json({ message: "student registered successfully" });
};

const declineStudentReg = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      isRegistering: false
    }
  );

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }
  res.status(200).json({ message: "student declined successfully" });
};

//get a students courses
const getStudentCourses = async (req, res) => {
  const { id } = req.params;
  const courses = await Student.findById(id)
    .select({
      courses: 1
    })
    .populate({
      path: "courses",
      select: { name: 1 }
    });

  if (!courses) {
    res.status(404).json({ message: "No Courses found" });
  }
  res.status(200).json(courses);
};

//get all students awaiting payment approval
const getPayStudents = async (req, res) => {
  const students = await Student.find({ isPaying: true }).select({
    firstName: 1,
    lastName: 1,
    program: 1,
    semester: 1
  });

  if (!students) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json(students);
};

//approve student payment
const approveStudentPay = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      isPaying: false,
      isPaid: true
    }
  );

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }
  res.status(200).json({ message: "student payment approved" });
};

//decline student payment
const declineStudentPay = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      isPaying: false
    }
  );

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }
  res.status(200).json({ message: "student payment declined" });
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

  res.status(200).json({ message: "Declined and Deleted successfully" });
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

const deleteFacilitator = async (req, res) => {
  const { facId } = req.body;
  try {
    await Facilitator.findOneAndDelete({ _id: facId });
    res.status(200).json({
      message: "Facilitator deleted successfully"
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
    await Program.findByIdAndUpdate(
      { _id: id },
      {
        $push: { programCourses: course._id }
      }
    );
    await Facilitator.findByIdAndUpdate(
      { _id: courseFacilitator },
      {
        $push: { courses: course._id }
      }
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

//add course time
const addCourseTime = async (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No course found" });
  }
  try {
    await Course.findByIdAndUpdate(id, { time: time });

    res.status(200).json({
      message: "Course time added successfully"
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

  const courses = await Course.find({ program: id });

  if (!courses) {
    res.status(404).json({ error: "No courses found" });
  }

  res.status(200).json(courses);
};

//create a semester
const createSemester = async (req, res) => {
  const { session, semester, semesterStart, semesterEnd } = req.body;
  try {
    await Semester.createSemester(
      semester,
      session,
      semesterStart,
      semesterEnd
    );
    res.status(200).json({
      message: "Semester created successfully",
      session,
      semester
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//get facilitator ids
const getFacIds = async (req, res) => {
  const facilitators = await Facilitator.find().select({
    firstName: 1,
    lastName: 1,
    email: 1,
    phone: 1
  });
  if (!facilitators) {
    res.status(404).json({ error: "No facilitators found" });
  }
  res.status(200).json(facilitators);
};

module.exports = {
  getDashboard,
  createAdmin,
  getDetails,
  getPrograms,
  getSpecificProgram,
  getFacIds,
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  deleteFacilitator,
  declineStudentApp,
  getStudentCourses,
  createProgram,
  createCourse,
  addCourseTime,
  getCourses,
  createSemester,
  getAppStudents,
  getRegStudents,
  approveStudentReg,
  declineStudentReg,
  getPayStudents,
  approveStudentPay,
  declineStudentPay
};
