import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // 🔹 Not logged in → go back to login
    return <Navigate to="/login" replace />;
  }

  // 🔹 Logged in → render nested routes
  return <Outlet />;
}

export default ProtectedRoute;