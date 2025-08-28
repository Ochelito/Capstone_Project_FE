import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // 🔹 Not logged in → go back to login
    return <Navigate to="/login" replace />;
  }

  // 🔹 Logged in → show requested page
  return children;
}

export default ProtectedRoute;