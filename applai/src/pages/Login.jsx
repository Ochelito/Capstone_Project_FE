import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/forms/LoginForm";
import GoogleLoginButton from "@/components/buttons/GoogleLoginButton";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import light from "@/assets/light.png";
import illustration from "@/assets/illustration.png";

function Login() {
  // Access auth and application store methods
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initApplications = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handle email/password login
  const handleEmailLogin = async (userData) => {
    login(userData, "email");             // Log in using email
    await initApplications("local");      // Initialize local application store
    navigate("/dashboard");               // Redirect to dashboard
  };

  // Handle Google login
  const handleGoogleLogin = async (userData) => {
    login(userData, "google");            // Log in using Google
    await initApplications("drive");      // Initialize cloud-based application store
    navigate("/dashboard");               // Redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center gap-8 p-8">
      
      {/* Left side: login form and Google login */}
      <div className="flex-1 max-w-md flex flex-col gap-6 bg-purple-50 rounded-xl shadow-lg p-8">
        {/* Logo */}
        <img src={light} alt="Logo" className="h-9 w-32 mx-auto" />

        {/* Heading and description */}
        <h1 className="text-2xl font-bold text-black text-center">
          Start tracking your Job Applications for FREE
        </h1>
        <p className="text-gray-600 text-center">
          Login with your email to access your applications or continue with Google for cloud sync.
        </p>

        {/* Email/password login form */}
        <LoginForm onLogin={handleEmailLogin} />

        {/* Divider with note */}
        <div className="flex items-center gap-2 my-2">
          <span className="flex-1 h-px bg-purple-200"></span>
          <p className="text-gray-500 text-sm">Access your applications across multiple devices</p>
          <span className="flex-1 h-px bg-purple-200"></span>
        </div>

        {/* Google login button */}
        <GoogleLoginButton onSuccess={handleGoogleLogin} />
      </div>

      {/* Right side: illustration (hidden on small screens) */}
      <div className="flex-1 hidden lg:flex justify-center items-center bg-purple-50 rounded-2xl shadow-inner w-full max-w-lg aspect-square p-6">
        <img
          src={illustration}
          alt="Login illustration"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    </div>
  );
}

export default Login;