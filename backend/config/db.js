const mongoose = require("mongoose");


const connectDB = async () => {
try {
await mongoose.connect("mongodb+srv://KABIRDHARSHAANU:wgn1U6Fz2zRdu6I6@cluster0.raq2r.mongodb.net/time_tabel?retryWrites=true&w=majority&appName=Cluster0");
console.log("MongoDB connected successfully");
} catch (error) {
console.error("DB connection failed:", error.message);
process.exit(1);
}
};


module.exports = connectDB;