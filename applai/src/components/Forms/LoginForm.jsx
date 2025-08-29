import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const initAppStore = useApplicationStore((state) => state.init);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (username.length < 8) {
      alert("Username must be at least 8 characters long.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userKey = `jobtracker_user_${username}`;
      const storedData = JSON.parse(localStorage.getItem(userKey));

      let user;
      if (storedData) {
        // Returning user: verify password
        if (storedData.password !== password) {
          alert("Incorrect password for this username.");
          return;
        }
        user = {
          username,
          picture: storedData.picture || null,
        };
      } else {
        // New user: create entry
        user = { username, picture: null };
        localStorage.setItem(userKey, JSON.stringify({ username, password, picture: null }));
      }

      // 🔹 Store user in authStore
      login(user, "local");

      // 🔹 Initialize application store from localStorage
      await initAppStore("local");

      // 🔹 Optional callback
      if (onLogin) onLogin(user);

      // 🔹 Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
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