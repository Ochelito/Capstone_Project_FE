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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (!window.google) {
      alert("Google login is not available. Please try again later.");
      return;
    }

    // 🔹 Initialize GIS to validate email and get user profile
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // replace with your actual client ID
      callback: handleCredentialResponse,
    });

    // 🔹 Prompt GIS
    window.google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response) => {
    try {
      const data = parseJwt(response.credential);

      if (!data.email || !data.email_verified) {
        alert("Invalid or unverified email. Please use a valid Google account.");
        return;
      }

      // Build user object
      const user = {
        email: data.email,
        name: data.name || email.split("@")[0],
        picture: data.picture || null,
      };

      // 🔹 Log in user
      login(user, "email");

      // 🔹 Initialize local application store
      await initAppStore("local");

      // 🔹 Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  // helper to decode GIS JWT
  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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