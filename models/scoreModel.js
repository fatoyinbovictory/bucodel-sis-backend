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
    score: { type: Number, required: [true, "Please specify a score"] }
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

  const studentScore = await this.create({
    studentId,
    courseId,
    score
  });

  return studentScore;
};

const Score = mongoose.model("Score", scoreSchema);
module.exports = { Score };
