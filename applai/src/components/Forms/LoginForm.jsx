import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 🔹 local error state

  const login = useAuthStore((state) => state.login);
  const initAppStore = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // clear previous error

    try {
      // ✅ Validation
      if (username.trim().length < 8) {
        throw new Error("Username must be at least 8 characters.");
      }
      if (password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      // ✅ Build user object
      const userData = {
        username: username.trim(),
        password: password.trim(), 
        picture: null,
      };

      // ✅ Store user in Zustand
      login(userData, "local");

      // ✅ Init application state
      await initAppStore("local");

      // ✅ Optional callback
      if (onLogin) onLogin(userData);

      // ✅ Navigate
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        className="p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}