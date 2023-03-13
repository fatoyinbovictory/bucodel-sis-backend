// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facilitatorRoutes = require("./routes/facilitatorRoutes")

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/facilitator", facilitatorRoutes);

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully Connected to Database");
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
  })
  .catch((e) => {
    console.log(`Unable to connect to database due to ${e}`);
  });
