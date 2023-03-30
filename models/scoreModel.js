const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const scoreSchema = new mongoose.Schema([
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      unique: false,
      required: [true, "Please specify a student"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      unique: false,
      required: [true, "Please specify a course"],
    },
    score: { type: Number, required: [true, "Please specify a score"] },
    grade: {
      type: String,
    },
    gradePoint: {
      type: Number,
    },
  },
]);

scoreSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
scoreSchema.plugin(uniqueValidator, {
  message: "You have already assigned a score to this student",
});

scoreSchema.statics.postScore = async function (studentId, courseId, score) {
  if (score < 0) {
    throw Error("Score cannot be less than 0");
  }
  if (score > 100) {
    throw Error("Score cannot be more than 100");
  }

  let grade = "NG";

  switch (true) {
    case score >= 80:
      grade = "A";
      gradePoint= 5;
      break;
    case score >= 60:
      grade = "B";
      gradePoint= 4;
      break;
    case score >= 50:
      grade = "C";
      gradePoint= 3;
      break;
    case score >= 40:
      grade = "D";
      gradePoint= 2;
      break;
    default:
      grade = "F";
      gradePoint= 0;
      break;
  }

  const studentScore = await this.create({
    studentId,
    courseId,
    score,
    grade,
    gradePoint
  });

  return studentScore;
};

const Score = mongoose.model("Score", scoreSchema);
module.exports = { Score };
