
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
    },
    placeDistrict: {
      type: String,
      required: true,
    },
    hmName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["HM"],
      default: "HM",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", schoolSchema);
