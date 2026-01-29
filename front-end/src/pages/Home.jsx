import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
        <p className="text-sm text-gray-500 mb-8">
          Click below to create a new account
        </p>

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-xl text-base hover:bg-gray-800 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
