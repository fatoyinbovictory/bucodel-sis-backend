const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be at least 3 characters"]
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
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      minLength: [3, "Email must be at least 3 characters"],
      unique: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: [11, "Phone number must be at least 11 characters"]
    }
  },
  { timestamps: true }
);

//static application method
adminSchema.statics.createA = async function (
  password,
  firstName,
  lastName,
  email,
  phone
) {
  const exists = await this.findOne({ email });

  //check if email is already used
  if (exists) {
    throw Error("Email already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password.toString(), salt);

  const admin = await this.create({
    password: hash,
    firstName,
    lastName,
    email,
    phone
  });
  return admin;
};

adminSchema.statics.loginAdmin = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
