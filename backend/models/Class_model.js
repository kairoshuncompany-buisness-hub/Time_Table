const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true, // one document per class
    },
    sections: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
