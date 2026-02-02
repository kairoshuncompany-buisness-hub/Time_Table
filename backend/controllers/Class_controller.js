
const Subject = require("../models/Class_model");

// ================= ADD CLASS =================
exports.addClass = async (req, res) => {
  try {
    const { className } = req.body;
    if (!className) return res.status(400).json({ message: "Class name is required" });

    const existingClass = await Subject.findOne({ className });
    if (existingClass) return res.status(400).json({ message: "Class already exists" });

    const newClass = new Subject({ className, sections: [] });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADD SECTION =================
exports.addSection = async (req, res) => {
  try {
    const { className, section } = req.body;
    if (!className || !section) return res.status(400).json({ message: "Class & section required" });

    const subject = await Subject.findOne({ className });
    if (!subject) return res.status(404).json({ message: "Class not found" });

    if (subject.sections.includes(section)) return res.status(400).json({ message: "Section already exists" });

    subject.sections.push(section);
    await subject.save();
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE CLASS =================
exports.deleteClass = async (req, res) => {
  try {
    const { className } = req.body;
    if (!className) return res.status(400).json({ message: "Class name required" });

    const deletedClass = await Subject.findOneAndDelete({ className });
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE SECTION =================
exports.deleteSection = async (req, res) => {
  try {
    const { className, section } = req.body;
    if (!className || !section) return res.status(400).json({ message: "Class & section required" });

    const subject = await Subject.findOne({ className });
    if (!subject) return res.status(404).json({ message: "Class not found" });

    subject.sections = subject.sections.filter(sec => sec !== section);
    await subject.save();
    res.status(200).json({ message: "Section deleted successfully", subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL CLASSES =================
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Subject.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
