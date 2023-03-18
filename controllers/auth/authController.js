const { Student } = require("../../models/studentModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Facilitator } = require("../../models/facilitatorModel");
const { Admin } = require("../../models/adminModel");

// new student application
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
    pathToSsce,
    pathToUtme
  } = req.body;
  const ssceFile = req.files.ssceFile;
  const ssceFilename = ssceFile.name;
  const utmeFile = req.files.utmeFile;
  const utmeFilename = utmeFile.name;
  const filepath = "uploads/applications/";
  ssceFile.mv(`${filepath}${ssceFilename}`, (error) => {
    if (error) {
      res.status(500).json({ message: error });
    }
  });
  utmeFile.mv(`${filepath}${utmeFilename}`, (error) => {
    if (error) {
      res.status(500).json({ message: error });
    }
  });
  try {
    const student = await Student.apply(
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
      pathToSsce,
      pathToUtme
    );
    //create token
    const token = jwt.sign(
      { student_id: student._id, email },
      process.env.SECRET,
      {
        expiresIn: "2h"
      }
    );
    // save user token
    student.token = token;

    res.status(200).json({ email, _id: student._id, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//student login
const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.loginStudent(email, password);
    const program = await Student.findOne({ email: email });
    //create token
    const token = jwt.sign(
      { student_id: student._id, email },
      process.env.SECRET,
      {
        expiresIn: "2h"
      }
    );
    // save token
    student.token = token;

    res.status(200).json({ email, id: student._id, program: program.name });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// facilitator login
const loginFacilitator = async (req, res) => {
  const { email, password } = req.body;
  try {
    const facilitator = await Facilitator.loginFacilitator(email, password);

    //create token
    const token = jwt.sign(
      { facilitator_id: facilitator._id, email },
      process.env.SECRET,
      {
        expiresIn: "2h"
      }
    );
    // save user token
    facilitator.token = token;

    res.status(200).json({
      message: "Login Successful",
      email,
      id: facilitator._id,
      token
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.loginAdmin(email, password);

    //create token
    const token = jwt.sign({ admin_id: admin._id, email }, process.env.SECRET, {
      expiresIn: "2h"
    });
    // save user token
    admin.token = token;

    res.status(200).json({
      message: "Login Successful",
      email,
      id: admin._id,
      token
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createStudent, loginStudent, loginFacilitator, loginAdmin };
