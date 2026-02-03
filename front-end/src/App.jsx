

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Register from "./pages/Register_Form";
// import Login from "./pages/Login_";
// import Space from "./pages/Space";
// import Teacher from "./pages/Add_teacher";
// import ViewTeachers from "./pages/View_teacher";
// import Subject from "./pages/Class";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ================= AUTH ================= */}
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* ================= DASHBOARD ================= */}
//         <Route path="/space" element={<Space />} />

//         {/* ================= TEACHERS ================= */}
//         <Route path="/add-teacher" element={<Teacher />} />
//         <Route path="/view-teachers" element={<ViewTeachers />} />

//         {/* ================= SUBJECT / CLASS / SECTION ================= */}
//         <Route path="/add-subject" element={<Subject />} /> {/* ✅ NEW */}
//       </Routes>
//     </Router>
//   );
// }






















import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register_Form";
import Login from "./pages/Login_";
import Space from "./pages/Space";
import Teacher from "./pages/Add_teacher";
import ViewTeachers from "./pages/View_teacher";
import Subject from "./pages/Class";
import Schedule from "./pages/Schedule"; // ✅ Import Schedule

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ================= DASHBOARD ================= */}
        <Route path="/space" element={<Space />} />

        {/* ================= TEACHERS ================= */}
        <Route path="/add-teacher" element={<Teacher />} />
        <Route path="/view-teachers" element={<ViewTeachers />} />

        {/* ================= SUBJECT / CLASS / SECTION ================= */}
        <Route path="/add-subject" element={<Subject />} />

        {/* ================= SCHEDULE / TIMETABLE ================= */}
        <Route path="/create-timetable" element={<Schedule />} /> {/* Scheduler Page */}
      </Routes>
    </Router>
  );
}
