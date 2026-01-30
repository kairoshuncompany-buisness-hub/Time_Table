


const express = require("express");
const router = express.Router();
const {
  registerHM,
  loginHM,
} = require("../controllers/registration_controller");

router.post("/register", registerHM);
router.post("/login", loginHM);

module.exports = router;
