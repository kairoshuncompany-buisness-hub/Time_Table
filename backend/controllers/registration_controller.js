const School = require("../models/register_model");


exports.registerSchool = async (req, res) => {
try {
const { schoolName, placeDistrict, hmName, email, password, confirmPassword } = req.body;


if (password !== confirmPassword) {
return res.status(400).json({ message: "Passwords do not match" });
}


const existing = await School.findOne({ email });
if (existing) {
return res.status(409).json({ message: "School already registered" });
}


const school = new School({
schoolName,
placeDistrict,
hmName,
email,
password,
});


await school.save();


res.status(201).json({ message: "Registration successful" });
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};