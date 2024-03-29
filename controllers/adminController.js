require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Program } = require("../models/programModel");
const { Course } = require("../models/courseModel");
const { Admin } = require("../models/adminModel");
const { Semester } = require("../models/semesterModel");
const { Newsroom } = require("../models/NewsroomModel");

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
  const { studentEmail } = req.body;

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: "bucodel.sis@gmail.com",
    to: studentEmail,
    subject: "Application to BUCODeL",
    text: "Congratulations! Your application has been approved. You can now login to your account and begin your online learning experience!"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
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
  const { studentEmail, declineMessage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No student found" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    res.status(404).json({ error: "No student found" });
  }

  res.status(200).json({ message: "Declined and Deleted successfully" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: "bucodel.sis@gmail.com",
    to: studentEmail,
    subject: "Application to BUCODeL",
    text: `Unfortunately, your application to BUCODeL has been denied due to: ${declineMessage}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
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

//view semesters
const viewSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//make semester active
const makeSemActive = async (req, res) => {
  const { id } = req.params;
  try {
    await Semester.findByIdAndUpdate(id, { isActive: true });
    res.status(200).json({ message: "Activation Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//end semester
const endSem = async (req, res) => {
  const { id } = req.params;
  try {
    await Semester.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: "Semester End Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

//view all news posts
const viewAllNews = async (req, res) => {
  try {
    const news = await Newsroom.find().select({
      heading: 1,
      author: 1,
      bodyPreview: 1,
      createdAt: 1
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//view specifc news post
const viewNews = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "News not found" });
    } else {
      const news = await Newsroom.findById(id).select({
        heading: 1,
        author: 1,
        subHeading: 1,
        body: 1,
        createdAt: 1,
        updatedAt: 1
      });
      res.status(200).json(news);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create news post
const createNews = async (req, res) => {
  const { heading, subHeading, author, body } = req.body;
  try {
    await Newsroom.postNews(heading, subHeading, author, body);
    res.status(200).json({ message: "News posted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update news post
const updateNews = async (req, res) => {
  const { id } = req.params;
  const { heading, subHeading, author, body } = req.body;
  try {
    await Newsroom.findByIdAndUpdate(id, { heading, subHeading, author, body });
    res.status(200).json({ message: "News updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete news post
const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await Newsroom.findByIdAndDelete(id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create student account
const createStudent = async (req, res) => {
  const {
    password,
    firstName,
    lastName,
    middleName,
    dateofBirth,
    sex,
    email,
    nationality,
    nameOfGuardian,
    stateOfOrigin,
    address,
    phone,
    placeOfBirth,
    program,
    isApproved,
    pathToSsce
  } = req.body;

  try {
    if (req.files) {
      const ssceFile = req.files.ssceFile;
      const ssceFilename = ssceFile.name;
      const filepath = "uploads/applications/";
      ssceFile.mv(`${filepath}${ssceFilename}`, (error) => {
        if (error) {
          res.status(500).json({ message: error });
        }
      });
      const student = await Student.applyAsAdmin(
        password,
        firstName,
        lastName,
        middleName,
        dateofBirth,
        sex,
        email,
        nationality,
        nameOfGuardian,
        stateOfOrigin,
        address,
        phone,
        placeOfBirth,
        program,
        isApproved,
        pathToSsce
      );
      res.status(200).json({ email, _id: student._id });
    } else {
      res.status(400).json({ error: "Please upload your SSCE result" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
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
  declineStudentPay,
  viewSemesters,
  makeSemActive,
  endSem,
  viewNews,
  viewAllNews,
  createNews,
  updateNews,
  deleteNews,
  createStudent
};
