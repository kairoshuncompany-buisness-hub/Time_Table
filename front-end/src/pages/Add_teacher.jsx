

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Teacher() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    schoolName: "",
    name: "",
    subjects: [],
    email: "",
    password: "",
  });

  const [subjectInput, setSubjectInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add subject on Enter
  const handleSubjectKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = subjectInput.trim();
      if (!value) return;

      if (!form.subjects.includes(value)) {
        setForm({
          ...form,
          subjects: [...form.subjects, value],
        });
      }
      setSubjectInput("");
    }
  };

  const removeSubject = (subject) => {
    setForm({
      ...form,
      subjects: form.subjects.filter((s) => s !== subject),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/teachers/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Teacher registered successfully ✅");

      setForm({
        schoolName: "",
        name: "",
        subjects: [],
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 relative">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 border border-black px-3 py-1 rounded-lg text-sm hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Add Teacher
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter teacher details
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm text-center mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* School Name */}
          <div>
            <label className="text-sm font-medium">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={form.schoolName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>

          {/* Teacher Name */}
          <div>
            <label className="text-sm font-medium">Teacher Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>

          {/* Subjects */}
          <div>
            <label className="text-sm font-medium">
              Subjects (press Enter)
            </label>
            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={handleSubjectKeyDown}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {form.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-sm"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="text-xs hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
}
