const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be at least 3 characters"]
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name must be at least 3 characters"]
    },
    password: {
      type: String,
      required: [true, "Please specifiy a password"],
      minLength: [8, "password must be at least 8 characters long"]
      // maxLength: [32, "Password must be less than 32 characters"]
    },
    dateOfBirth: {
      type: Date
      // required: [true, "Date of birth is required"]
    },
    sex: {
      type: String,
      required: [true, "Sex is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      minLength: [3, "Email must be at least 3 characters"],
      unique: true
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"]
    },
    nameOfGuardian: {
      type: String,
      required: [true, "Guardian Name is required"]
    },
    stateOfOrigin: {
      type: String,
      required: [true, "State of origin is required"]
    },
    address: {
      type: String,
      required: [true, "Address is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: [11, "Phone number must be at least 11 characters"]
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"]
    },
    program: {
      type: String,
      required: [true, "Program is required"]
    },
    previousUni: {
      type: String
    },
    matricNo: {
      type: String,
      unique: true
    },
    isApproved: {
      type: Boolean
    },
    isRegistering: {
      type: Boolean
    },
    isRegistered: {
      type: Boolean
    },
    isPaying: {
      type: Boolean
    },
    isPaid: {
      type: Boolean
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    semester: {
      type: String
    }
  },
  { timestamps: true }
);

//static application method
studentSchema.statics.apply = async function (
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
) {
  const exists = await this.findOne({ email });

  //check if email is already used
  if (exists) {
    throw Error("Email already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password.toString(), salt);

  //generate matricNo
  const random = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().toLocaleDateString("en", { year: "2-digit" });
  const gen = year.concat("/", random);

  const student = await this.create({
    password: hash,
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
    isApproved: false,
    isRegistering: false,
    isRegistered: false,
    isPaying: false,
    isPaid: false,
    matricNo: gen
  });
  return student;
};

studentSchema.statics.loginStudent = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const student = await this.findOne({ email });

  if (!student) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, student.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return student;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
