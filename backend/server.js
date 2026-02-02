




const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ================= ROUTES =================
const authRoutes = require("./routes/registration_route");
const teacherRoutes = require("./routes/Teacher_register_route");
const classRoutes = require("./routes/Class_Routes"); // ✅ lowercase variable

const app = express();
const PORT = 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json()); // replaces body-parser

// ================= DATABASE =================
connectDB();

// ================= API ROUTES =================
app.use("/api", authRoutes);                 
app.use("/api/teachers", teacherRoutes);     
app.use("/api/classes", classRoutes);      // ✅ fixed variable

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



