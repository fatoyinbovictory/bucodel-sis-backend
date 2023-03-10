const Student = require("../../models/studentModel");
const mongoose = require("mongoose");

// new student application
const createStudent = async (req, res) => {
  const {
    firstName,
    password,
    lastName,
    dateofBirth,
    sex,
    middleName,
    email,
    nationality,
    nameOfGuardian,
    stateOfOrigin,
    address,
    phone,
    placeOfBirth,
    program,
    isApproved,
    matricNo
  } = req.body;

  try {
    const student = await Student.apply({
      firstName,
      lastName,
      password,
      dateofBirth,
      sex,
      email,
      middleName,
      nationality,
      nameOfGuardian,
      stateOfOrigin,
      address,
      phone,
      placeOfBirth,
      program,
      isApproved,
      matricNo
    });
    res.status(200).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//student login

module.exports = { createStudent };
