const mongoose = require("mongoose");


const SchoolSchema = new mongoose.Schema({
schoolName: { type: String, required: true },
placeDistrict: { type: String, required: true },
hmName: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
});


module.exports = mongoose.model("School", SchoolSchema);