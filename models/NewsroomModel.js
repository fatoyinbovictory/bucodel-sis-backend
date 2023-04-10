const mongoose = require("mongoose");

const newsroomSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Heading is required"]
    },
    subHeading: {
      type: String
    },
    author: {
      type: String,
      required: [true, "An author is required"]
    },
    body: {
      type: String,
      required: [true, "The news body is required"]
    },
    bodyPreview: {
      type: String
    }
  },
  { timestamps: true }
);

newsroomSchema.statics.postNews = async function (
  heading,
  subHeading,
  author,
  body
) {
  bodyPreview = body.slice(0, 180);

  const news = await this.create({
    heading,
    subHeading,
    author,
    body,
    bodyPreview
  });

  return news;
};

const Newsroom = mongoose.model("Newsroom", newsroomSchema);
module.exports = { Newsroom };
