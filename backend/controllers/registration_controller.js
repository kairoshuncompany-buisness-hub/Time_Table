



require("dotenv").config(); // 🔥 ADD THIS LINE

const School = require("../models/register_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerHM = async (req, res) => {
  try {
    const {
      schoolName,
      placeDistrict,
      hmName,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await School.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "HM already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const school = new School({
      schoolName,
      placeDistrict,
      hmName,
      email,
      password: hashedPassword,
      role: "HM",
    });

    await school.save();

    res.status(201).json({
      message: "HM registration successful",
    });
  } catch (error) {
    console.error("REGISTER HM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   HM LOGIN
================================ */
exports.loginHM = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hm = await School.findOne({ email, role: "HM" });
    if (!hm) {
      return res.status(404).json({ message: "HM not found" });
    }

    const isMatch = await bcrypt.compare(password, hm.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔍 DEBUG (optional, remove later)
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: hm._id, role: hm.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      hm: {
        id: hm._id,
        hmName: hm.hmName,
        schoolName: hm.schoolName,
        email: hm.email,
        role: hm.role,
      },
    });
  } catch (error) {
    console.error("LOGIN HM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
