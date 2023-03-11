const { Student } = require("../../models/studentModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


// new student application
const createStudent = async (req, res) => {
  const {
    password,
    firstName,
    lastName,
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
    isApproved
  } = req.body;
  try {
    const student = await Student.apply(
      password,
      firstName,
      lastName,
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
      isApproved
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

    res.status(200).json({ message: "Login Successful", email, _id: student._id, token, });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createStudent, loginStudent };
