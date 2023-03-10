// import mongoose, { Mongoose } from "mongoose";
const mongoose = require("mongoose");

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
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"]
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema)
