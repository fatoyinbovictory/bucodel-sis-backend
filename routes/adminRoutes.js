const express = require("express");
const { createFacilitator } = require("../controllers/adminController");
const router = express.Router();

router.post("/createFacilitator", createFacilitator);

module.exports = router;
