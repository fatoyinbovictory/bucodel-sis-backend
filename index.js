import express from "express";
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect(
  "mongodb://localhost/bucodelSis",
  () => {
    console.log("Connected to database");
  },
  (e) => {
    console.log(`Failed to connected due to ${e}`);
  }
);

const app = express();

app.use(cors());
app.use(express.json());

app.post("api/register", (req, res) => {
  console.log(req.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
