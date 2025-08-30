import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = useAuthStore((state) => state.login);
  const initAppStore = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (username.trim().length < 8) {
        throw new Error("Username must be at least 8 characters.");
      }
      if (password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const userData = {
        username: username.trim(),
        password: password.trim(),
        picture: null,
      };

      login(userData, "local");
      await initAppStore("local");

      if (onLogin) onLogin(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-black mb-2">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Username (min 8 chars)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
        required
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
        required
      />

      <button
        type="submit"
        className="bg-purple-300 hover:bg-purple-400 text-black font-medium py-3 rounded-lg transition-colors"
      >
        Login
      </button>
    </form>
  );
}