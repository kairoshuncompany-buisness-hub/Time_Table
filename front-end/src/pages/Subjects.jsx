
import { useState } from "react";

export default function Subject() {
  const classOptions = ["6", "7", "8", "9", "10"];

  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState({});
  const [sectionInput, setSectionInput] = useState("");

  const handleAddClass = () => {
    if (!selectedClass) return;

    if (!classes[selectedClass]) {
      setClasses({
        ...classes,
        [selectedClass]: [],
      });
    }
  };

  const handleAddSection = () => {
    if (!selectedClass || !sectionInput) return;

    const sectionName = `${selectedClass}-${sectionInput.toUpperCase()}`;

    if (!classes[selectedClass].includes(sectionName)) {
      setClasses({
        ...classes,
        [selectedClass]: [...classes[selectedClass], sectionName],
      });
    }

    setSectionInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Class & Section Setup
        </h2>

        {/* ================= ADD CLASS ================= */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Class
          </label>

          <div className="flex gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Choose class</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddClass}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* ================= ADD SECTION ================= */}
        {classes[selectedClass] && (
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
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={handleAddSection}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* ================= DISPLAY ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Available Classes
          </h3>

          {Object.keys(classes).length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No classes added yet
            </p>
          )}

          <div className="space-y-3">
            {Object.entries(classes).map(([cls, sections]) => (
              <div
                key={cls}
                className="border border-gray-200 rounded-xl p-4"
              >
                <p className="font-medium mb-2">
                  Class {cls}
                </p>

                {sections.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No sections added
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {sections.map((sec) => (
                      <span
                        key={sec}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
