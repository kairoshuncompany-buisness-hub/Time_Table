

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register_Form";
import Login from "./pages/Login_";
import Space from "./pages/Space";
import Teacher from "./pages/Add_teacher"; 
import ViewTeachers from "./pages/View_teacher"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/space" element={<Space />} />
        <Route path="/add-teacher" element={<Teacher />} /> 
        <Route path="/view-teachers" element={<ViewTeachers />} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}
