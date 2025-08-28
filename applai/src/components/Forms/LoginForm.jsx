import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const initAppStore = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For demo purposes, we just "accept" any email/password
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Log in the user
    login({ email });

    // Initialize application store in local mode
    await initAppStore("local");

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Login
      </button>
    </form>
  );
}