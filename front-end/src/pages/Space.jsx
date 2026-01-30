
import { useNavigate } from "react-router-dom";

export default function Space() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Navigate to Add Teacher page
  const goToAddTeacher = () => {
    navigate("/add-teacher");
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [
    "Period 1",
    "Period 2",
    "Period 3",
    "Period 4",
    "Period 5",
    "Period 6",
    "Period 7",
    "Period 8",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">
            {user?.schoolName || "School Dashboard"}
          </h1>
          <p className="text-sm text-gray-300">
            Welcome, {user?.hmName || "User"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      {/* ================= MAIN ================= */}
      <main className="p-6 space-y-10">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Total Teachers</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Total Classes</h3>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Timetables</h3>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
        </div>

        {/* ================= TIMETABLE TABLE ================= */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">
            General Timetable
          </h3>

          <table className="w-full border border-gray-200 text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Day</th>
                {periods.map((period, index) => (
                  <th key={index} className="border px-4 py-2">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">
                    {day}
                  </td>

                  {periods.map((_, periodIndex) => (
                    <td
                      key={periodIndex}
                      className="border px-4 py-2 text-gray-400"
                    >
                      —
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={goToAddTeacher}
              className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Add Teacher
            </button>

            <button className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800">
              Create Timetable
            </button>

            <button className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800">
              View Reports
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
