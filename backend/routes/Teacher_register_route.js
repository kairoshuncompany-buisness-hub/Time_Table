

// routes/Teacher_register_route.js
const express = require("express");
const router = express.Router();

const {
  registerTeacher,
  getAllTeachers,
} = require("../controllers/Teacher_register_controller");

// POST → Register teacher
router.post("/register", registerTeacher);

// GET → Get all teachers
router.get("/", getAllTeachers);

module.exports = router;









