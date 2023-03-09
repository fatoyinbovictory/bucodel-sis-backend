import express from "express";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost/bucodelSis",
  () => {
    console.log("Connected to database");
  },
  (e) => {
    console.log("Failed to connected due to", e);
  }
);

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
