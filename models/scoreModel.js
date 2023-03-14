const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema([
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      unique: false,
      required: [true, "Please specify a student"]
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      unique: false,
      required: [true, "Please specify a course"]
    },
    score: { type: Number, required: [true, "Please specify a score"] },
    grade: {
      type: String
    }
  }
]);

scoreSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

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
      break;
    case score >= 60:
      grade = "B";
      break;
    case score >= 50:
      grade = "C";
      break;
    case score >= 40:
      grade = "D";
      break;
    default:
      grade = "F";
      break;
  }

  const studentScore = await this.create({
    studentId,
    courseId,
    score,
    grade
  });

  return studentScore;
};

const Score = mongoose.model("Score", scoreSchema);
module.exports = { Score };
