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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailLogin = async (userData) => {
    login(userData, "email");
    await initApplications("local");
    navigate("/dashboard");
  };

  const handleGoogleLogin = async (userData) => {
    login(userData, "google");
    await initApplications("drive");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center gap-8 p-8">
      {/* Left side: login form / Google login */}
      <div className="flex-1 max-w-md flex flex-col gap-6 bg-purple-50 rounded-xl shadow-lg p-8">
        <img src="/assets/logo.png" alt="Logo" className="h-12 w-12 mx-auto" />
        <h1 className="text-2xl font-bold text-black text-center">
          Start tracking your Job Applications for FREE
        </h1>
        <p className="text-gray-600 text-center">
          Login with your email to access your applications or continue with Google for cloud sync.
        </p>

        {/* Email/password login */}
        <LoginForm onLogin={handleEmailLogin} />

        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <span className="flex-1 h-px bg-purple-200"></span>
          <p className="text-gray-500 text-sm">Access your applications across multiple devices</p>
          <span className="flex-1 h-px bg-purple-200"></span>
        </div>

        {/* Google login */}
        <GoogleLoginButton onSuccess={handleGoogleLogin} />
      </div>

      {/* Right side: illustration */}
      <div className="flex-1 flex justify-center">
        <img src="/assets/login-image.png" alt="Login illustration" className="max-w-sm rounded-xl shadow-lg" />
      </div>
    </div>
  );
}

export default Login;