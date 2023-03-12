const mongoose = require("mongoose");
const { Student } = require("../models/studentModel");
const { Facilitator } = require("../models/facilitatorModel");
const { Program } = require("../models/programModel");
const { Course } = require("../models/courseModel");

//add a course
const addCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(studentId) ||
    !mongoose.Types.ObjectId.isValid(courseId)
  ) {
    res.status(404).json({ error: "Student or Course not found" });
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

module.exports = { addCourse };
