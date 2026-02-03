import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    schoolName: "",
    placeDistrict: "",
    hmName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        setSuccess(false);
        setLoading(false);
        return;
      }

      // Success
      setMessage("Registration successful ✅");
      setSuccess(true);

      setForm({
        schoolName: "",
        placeDistrict: "",
        hmName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage("Server error. Please try again later");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          School Registration
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Fill in the details to create an account
        </p>

        {message && (
          <p
            className={`text-center text-sm mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            placeholder="School Name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            name="placeDistrict"
            value={form.placeDistrict}
            onChange={handleChange}
            placeholder="Place / District"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            name="hmName"
            value={form.hmName}
            onChange={handleChange}
            placeholder="HM Name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-xl text-base hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}




















