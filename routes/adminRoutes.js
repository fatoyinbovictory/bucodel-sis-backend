const express = require("express");
const {
  getStudents,
  getStudent,
  approveStudentApp,
  createFacilitator,
  declineStudentApp
} = require("../controllers/adminController");
const router = express.Router();

//get all students
router.get("/students", getStudents);

//create facilitator
router.post("/createFacilitator", createFacilitator);

//get specific student
router.get("/getStudent/:id", getStudent);

//approve a student application
router.patch("/approveStudentApp/:id", approveStudentApp);

//decline student application
router.delete("/declineStudentApp/:id", declineStudentApp);

module.exports = router;
