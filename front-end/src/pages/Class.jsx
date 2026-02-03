
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
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ================= ADD CLASS =================
  const handleAddClass = async () => {
    if (!selectedClass) return;
    if (classes.some(c => c.className === selectedClass))
      return alert("Class already exists");

    try {
      setLoading(true);
      await fetch(`${API_URL}/add-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className: selectedClass }),
      });
      setSelectedClass("");
      fetchClasses();
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
      await fetch(`${API_URL}/add-section`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ className: selectedClass, section: sectionName }),
      });
      setSectionInput("");
      fetchClasses();
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE CLASS =================
  const handleDeleteClass = async (className) => {
    if (!window.confirm("Delete this class?")) return;

    await fetch(`${API_URL}/delete-class`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ className }),
    });
    fetchClasses();
  };

  // ================= DELETE SECTION =================
  const handleDeleteSection = async (className, section) => {
    await fetch(`${API_URL}/delete-section`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ className, section }),
    });
    fetchClasses();
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-10">
      <div className="w-full max-w-md border border-black p-6 rounded-xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => window.history.back()}
          className="mb-4 border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Class & Section Setup
        </h2>

        {/* ADD CLASS */}
        <div className="mb-5">
          <label className="block text-sm mb-2">Select Class</label>
          <div className="flex gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-1 border border-black px-3 py-2 rounded"
            >
              <option value="">Choose class</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <button
              onClick={handleAddClass}
              disabled={loading}
              className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white"
            >
              Add
            </button>
          </div>
        </div>

        {/* ADD SECTION */}
        {selectedClass && (
          <div className="mb-6">
            <label className="block text-sm mb-2">
              Add Section for Class {selectedClass}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="A, B, C"
                value={sectionInput}
                onChange={(e) => setSectionInput(e.target.value)}
                className="flex-1 border border-black px-3 py-2 rounded"
              />
              <button
                onClick={handleAddSection}
                className="border border-black px-4 py-2 rounded hover:bg-black hover:text-white"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* DISPLAY */}
        <h3 className="text-lg font-semibold mb-3">Available Classes</h3>

        {classes.length === 0 ? (
          <p className="text-sm text-center">No classes added</p>
        ) : (
          <div className="space-y-4">
            {classes.map(cls => (
              <div key={cls._id} className="border border-black p-4 rounded">
                <div className="flex justify-between mb-2">
                  <p>Class {cls.className}</p>
                  <button
                    onClick={() => handleDeleteClass(cls.className)}
                    className="text-sm underline"
                  >
                    Delete
                  </button>
                </div>

                {cls.sections.length === 0 ? (
                  <p className="text-sm">No sections</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cls.sections.map(sec => (
                      <span
                        key={sec}
                        className="border border-black px-3 py-1 rounded flex items-center gap-2"
                      >
                        {sec}
                        <button
                          onClick={() => handleDeleteSection(cls.className, sec)}
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
