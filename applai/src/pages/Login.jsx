import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/forms/LoginForm";
import GoogleLoginButton from "@/components/buttons/GoogleLoginButton";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";

function Login() {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initApplications = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  // 🔹 Redirect immediately if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // 🔹 Handles local login from LoginForm
  const handleEmailLogin = async (userData) => {
    login(userData, "email");          // store user in authStore
    await initApplications("local");    // load apps from localStorage
    navigate("/dashboard");             // redirect to dashboard
  };

  // 🔹 Handles Google login
  const handleGoogleLogin = async (userData) => {
    login(userData, "google");          // store user in authStore
    await initApplications("drive");    // load apps from Google Drive
    navigate("/dashboard");             // redirect to dashboard
  };

  return (
    <div className="login-page flex flex-col md:flex-row items-center justify-center gap-8 p-8">
      {/* Left side: login form / Google login */}
      <div className="flex-1 max-w-md flex flex-col gap-6">
        <img src="/assets/logo.png" alt="Logo" className="h-12 w-12" />
        <h1 className="text-2xl font-bold">Start tracking your Job Applications for FREE</h1>
        <p className="text-gray-600">
          Login with your email to access your applications or continue with Google for cloud sync.
        </p>

        {/* 🔹 Email/password login */}
        <LoginForm onLogin={handleEmailLogin} />

        {/* Divider */}
        <div className="flex items-center gap-2">
          <span className="flex-1 h-px bg-gray-300"></span>
          <p className="text-gray-500 text-sm">To access your applications across multiple devices</p>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* 🔹 Google login */}
        <GoogleLoginButton onSuccess={handleGoogleLogin} />
      </div>

      {/* Right side: illustration */}
      <div className="flex-1 hidden md:flex justify-center">
        <img src="/assets/login-image.png" alt="Login illustration" className="max-w-sm" />
      </div>
    </div>
  );
}

export default Login;