const express = require("express");
const router = express.Router();

const {
  registerTeacher,
} = require("../controllers/Teacher_register_controller");

router.post("/register", registerTeacher);

module.exports = router;
