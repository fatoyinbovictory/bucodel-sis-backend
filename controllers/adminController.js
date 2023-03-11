const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Facilitator } = require("../models/facilitatorModel");

//create facilitator
const createFacilitator = async (req, res) => {
  const { password, firstName, lastName, email, phone } = req.body;
  try {
    const facilitator = await Facilitator.create(
      password,
      firstName,
      lastName,
      email,
      phone
    );

    res.status(200).json({
      message: "Facilitator created successfully",
      email,
      _id: facilitator._id,
      token
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createFacilitator };
