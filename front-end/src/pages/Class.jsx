

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/classes";

export default function Subject() {
  const classOptions = ["6", "7", "8", "9", "10"];
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [sectionInput, setSectionInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH CLASSES =================
  const fetchClasses = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ================= ADD CLASS =================
  const handleAddClass = async () => {
    if (!selectedClass) return;
    if (classes.some((c) => c.className === selectedClass)) return alert("Class already exists");

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/add-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className: selectedClass }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setSelectedClass("");
      fetchClasses();
    } catch (err) {
      console.error("Add class failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD SECTION =================
  const handleAddSection = async () => {
    if (!selectedClass || !sectionInput) return;

    const sectionName = `${selectedClass}-${sectionInput.toUpperCase()}`;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/add-section`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className: selectedClass, section: sectionName }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setSectionInput("");
      fetchClasses();
    } catch (err) {
      console.error("Add section failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE CLASS =================
  const handleDeleteClass = async (className) => {
    if (!window.confirm(`Delete Class ${className} and all its sections?`)) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/delete-class`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className }),
      });
      await res.json();
      fetchClasses();
    } catch (err) {
      console.error("Delete class failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE SECTION =================
  const handleDeleteSection = async (className, section) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/delete-section`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className, section }),
      });
      await res.json();
      fetchClasses();
    } catch (err) {
      console.error("Delete section failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Class & Section Setup</h2>

        {/* ADD CLASS */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">Select Class</label>
          <div className="flex gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Choose class</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <button
              onClick={handleAddClass}
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        {/* ADD SECTION */}
        {selectedClass && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Add Section for Class {selectedClass}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="A, B, C..."
                value={sectionInput}
                onChange={(e) => setSectionInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                onClick={handleAddSection}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* DISPLAY */}
        <h3 className="text-lg font-semibold mb-3">Available Classes</h3>
        {classes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">No classes added yet</p>
        ) : (
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls._id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Class {cls.className}</p>
                  <button
                    onClick={() => handleDeleteClass(cls.className)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete Class
                  </button>
                </div>
                {cls.sections.length === 0 ? (
                  <p className="text-sm text-gray-400">No sections added</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cls.sections.map((sec) => (
                      <span key={sec} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {sec}
                        <button
                          onClick={() => handleDeleteSection(cls.className, sec)}
                          className="text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
