import { useNavigate } from "react-router-dom";

export default function Space() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        {/* Cards */}
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

        {/* Section */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            <button className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800">
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
