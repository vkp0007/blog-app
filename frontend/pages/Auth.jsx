import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../src/api.jsx";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.username)) {
      setError("All fields are required.");
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
      } else {
        response = await API.post("/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password,
        });
      }

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-2xl border border-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        {isLogin ? "Welcome Back!" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-500">{isLogin ? "New here?" : "Already have an account?"} </span>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
