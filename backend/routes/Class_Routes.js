

const express = require("express");
const router = express.Router();

const {
  addClass,
  addSection,
  deleteClass,
  deleteSection,
  getAllClasses,
} = require("../controllers/Class_controller");

// ADD
router.post("/add-class", addClass);
router.post("/add-section", addSection);

// DELETE
router.delete("/delete-class", deleteClass);
router.delete("/delete-section", deleteSection);

// GET
router.get("/", getAllClasses);

module.exports = router;
