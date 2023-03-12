const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Program name is required"],
      unique: true,
      minLength: [3, "Name must be at least 3 characters"]
    },
    programCode: {
      type: String,
      required: [true, "Program code is required"],
      minLength: [3, "Program code must be at least 3 characters"],
      unique: true
    },
    duration: {
      type: String,
      required: [true, "Duration is required"]
    },
    certification: {
      type: String,
      required: [true, "Certification is required"]
    },
    programFee: {
      type: String,
      required: [true, "Program fee is required"]
    },
    programHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facilitator",
      required: [true, "Porgram head is required"]
    },
    programCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  },
  { timestamps: true }
);

//static application method
programSchema.statics.createProgram = async function (
  name,
  programCode,
  duration,
  certification,
  programFee,
  programHead,
  programCourses
) {
  const exists = await this.findOne({ name });
  const exists2 = await this.findOne({ programCode });

  //check if email is already used
  if (exists) {
    throw Error("Program name already in use");
  }
  if (exists2) {
    throw Error("Program code already exists");
  }

  const program = await this.create({
    name,
    programCode,
    duration,
    certification,
    programFee,
    programHead,
    programCourses
  });

  return program;
};

const Program = mongoose.model("Program", programSchema);

module.exports = { Program };
