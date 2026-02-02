
// controllers/Teacher_register_controller.js
const Teacher = require("../models/Teacher_register_model");
const bcrypt = require("bcryptjs");

/**
 * @desc   Register new teacher
 * @route  POST /api/teachers/register
 */
exports.registerTeacher = async (req, res) => {
  try {
    const { schoolName, name, subjects, email, password } = req.body;

    // Validation
    if (!schoolName || !name || !subjects || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: "At least one subject is required" });
    }

    // Check if teacher exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({ message: "Teacher already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const teacher = await Teacher.create({
      schoolName,
      name,
      subjects,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Teacher registered successfully",
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subjects: teacher.subjects,
        schoolName: teacher.schoolName,
      },
    });
  } catch (error) {
    console.error("Teacher Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get all teachers
 * @route  GET /api/teachers
 */
exports.getAllTeachers = async (req, res) => {
  try {
      
    const filter = {};
    if (req.query.schoolName) {
      filter.schoolName = req.query.schoolName;
    }

    const teachers = await Teacher.find().select("-password"); // remove password

    res.status(200).json({
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    console.error("Get Teachers Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};














