const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema([
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      unique: true,
      minLength: [3, "Name must be at least 3 characters"]
    },
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      minLength: [5, "Course code must be at least 5 characters"],
      unique: true
    },
    creditHours: {
      type: String,
      required: [true, "Credit hours is required"]
    },
    courseFacilitator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facilitator",
      required: [true, "Facilitator is required"]
    },
    program: { type: mongoose.Schema.ObjectId, ref: "Program" },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
    classLink: { type: String }
  }
]);

courseSchema.statics.createCourse = async function (
  name,
  courseCode,
  creditHours,
  courseFacilitator,
  program
) {
  const exists = await this.findOne({ name });
  const exists2 = await this.findOne({ courseCode });

  //check if email is already used
  if (exists) {
    throw Error("Course name already exists");
  }
  if (exists2) {
    throw Error("Course code already exists");
  }

  const course = await this.create({
    name,
    courseCode,
    creditHours,
    courseFacilitator,
    program
  });

  return course;
};

const Course = mongoose.model("Course", courseSchema);
module.exports = { Course };
