const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const semesterSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: [true, "Session is required"]
    },
    semester: {
      type: String,
      required: [true, "Semester is required"]
    },
    semesterStart: {
      type: Date,
      required: [true, "Please specifiy a semsester start date"]
    },
    semesterEnd: {
      type: Date,
      required: [true, "Please specifiy a semsester end date"]
    },
    isActive: {
      type: Boolean,
    }
  }
);

//static create method
semesterSchema.statics.createSemester = async function (
  session,
  semester,
  semesterStart,
  semesterEnd
) {
  //check if semester date is in the past
  currentTime = Date.now();
  if (semesterStart < currentTime) {
    throw Error("Semester cannot start in the past");
  }
  //check if semester end is before semester start
  if (semesterStart > semesterEnd) {
    throw Error("Semester cannot end before it starts");
  }

  const makeSemester = await this.create({
    session,
    semester,
    semesterStart,
    semesterEnd
  });
  return makeSemester;
};

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = { Semester };
