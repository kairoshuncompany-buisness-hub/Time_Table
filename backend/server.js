const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");


const authRoutes = require("./routes/registration_route");


const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Database connection
connectDB();


// Routes
app.use("/api", authRoutes);


app.get("/", (req, res) => {
res.send("Backend running successfully");
});


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});