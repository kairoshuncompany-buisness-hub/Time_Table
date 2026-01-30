// import { useState } from "react";

// export default function Teacher() {
//   const [form, setForm] = useState({
//     schoolName: "",
//     name: "",
//     subjects: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       // 🔗 Connect backend API here later
//       console.log("Teacher Data:", form);

//       setSuccess("Teacher added successfully!");
//       setForm({
//         schoolName: "",
//         name: "",
//         subjects: "",
//         email: "",
//         password: "",
//       });
//     } catch (err) {
//       setError("Failed to add teacher");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
//         <h2 className="text-2xl font-semibold text-center mb-2">
//           Add Teacher
//         </h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Enter teacher details
//         </p>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">
//             {error}
//           </p>
//         )}

//         {success && (
//           <p className="text-green-600 text-sm text-center mb-4">
//             {success}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* School Name */}
//           <div>
//             <label className="text-sm font-medium">School Name</label>
//             <input
//               type="text"
//               name="schoolName"
//               value={form.schoolName}
//               onChange={handleChange}
//               placeholder="Enter school name"
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Teacher Name */}
//           <div>
//             <label className="text-sm font-medium">Teacher Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Subjects */}
//           <div>
//             <label className="text-sm font-medium">
//               Subjects (comma separated)
//             </label>
//             <input
//               type="text"
//               name="subjects"
//               value={form.subjects}
//               onChange={handleChange}
//               placeholder="Maths, Physics, Chemistry"
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="teacher@email.com"
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-60"
//           >
//             {loading ? "Adding..." : "Add Teacher"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












import { useState } from "react";

export default function Teacher() {
  const [form, setForm] = useState({
    schoolName: "",
    name: "",
    subjects: [], // ✅ array
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

  // ✅ Add subject on Enter
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

  // ✅ Remove subject
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
      console.log("Teacher Data:", form);

      setSuccess("Teacher added successfully!");
      setForm({
        schoolName: "",
        name: "",
        subjects: [],
        email: "",
        password: "",
      });
    } catch (err) {
      setError("Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
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
          <p className="text-green-600 text-sm text-center mb-4">{success}</p>
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
              Subjects (press Enter to add)
            </label>

            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={handleSubjectKeyDown}
              placeholder="Type subject and press Enter"
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />

            {/* Subject chips */}
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
