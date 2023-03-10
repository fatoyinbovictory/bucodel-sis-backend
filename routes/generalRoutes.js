const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

router.post("/register", async (req, res) => {
  const {
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
    matricNo
  } = req.body;

  try {
    const student = await Student.create({
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
      matricNo
    });
    res.status(200).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
