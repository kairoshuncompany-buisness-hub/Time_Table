const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/registration_route");
const teacherRoutes = require("./routes/Teacher_register_route"); 

const app = express();
const PORT = 5000;

// ================= Middleware =================
app.use(cors());
app.use(express.json()); // replaces body-parser

// ================= Database =================
connectDB();

// ================= Routes =================
app.use("/api", authRoutes);                 // HM login / register
app.use("/api/teachers", teacherRoutes);     // ✅ Teacher APIs

// ================= Health Check =================
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// ================= Server =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
