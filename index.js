// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const generalRoutes = require("./routes/generalRoutes");
const studentRoutes = require("./routes/studentRoutes");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", generalRoutes);
app.use("/api/student", studentRoutes);
// app.post("api/register", (req, res) => {
//   console.log(req.body);
// });

const PORT = process.env.PORT || 5000;

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  // .then(() => {
  //   console.log("Cnnecting to database...");
  // })
  .then(() => {
    console.log("Successfully Connected to Database");
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
  })
  .catch((e) => {
    console.log(`Unable to connect to database due to ${e}`);
  });
