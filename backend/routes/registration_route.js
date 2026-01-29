const express = require("express");
const router = express.Router();


const { registerSchool } = require("../controllers/registration_controller");


router.post("/register", registerSchool);


module.exports = router;