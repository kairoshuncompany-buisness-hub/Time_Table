import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewTeachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teachers");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch teachers");
      }

      setTeachers(data.teachers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Teachers</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Back
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading teachers...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* Table */}
      {!loading && teachers.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">Name</th>
                <th className="border px-4 py-3">Email</th>
                <th className="border px-4 py-3">Subjects</th>
                <th className="border px-4 py-3">School</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-medium">{teacher.name}</td>
                  <td className="border px-4 py-2">{teacher.email}</td>
                  <td className="border px-4 py-2">{teacher.subjects.join(", ")}</td>
                  <td className="border px-4 py-2">{teacher.schoolName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {!loading && teachers.length === 0 && (
        <p className="text-center text-gray-500">No teachers found</p>
      )}
    </div>
  );
}
