

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ================= ROUTES =================
const authRoutes = require("./routes/registration_route");
const teacherRoutes = require("./routes/Teacher_register_route");
const ClassRoutes = require("./routes/Class_Routes"); 

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
app.use("/api/classes", ClassRoutes);     

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
