import React, { useEffect, useRef } from "react";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  // Reference to hold the Google button container (DOM element)
  const buttonRef = useRef(null);

  // Access global authentication function from Zustand store
  const login = useAuthStore((state) => state.login);

  // Initialize application store (after login)
  const initAppStore = useApplicationStore((state) => state.init);

  // Navigation hook from React Router
  const navigate = useNavigate();

  // Run Google Identity initialization on component mount
  useEffect(() => {
    // If Google script hasn't loaded yet, show error
    if (!window.google) {
      alert(
        "Google login is not available right now. Please refresh or try again later."
      );
      return;
    }

    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id:
        "174014466302-2l3he8lepnhou7uei48a6jj4jj5rdnns.apps.googleusercontent.com", // Replace with your own Client ID
      callback: handleCredentialResponse, // Function called after login success
    });

    // Render the Google login button into the referenced element
    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",   // "outline" style
        size: "large",      // Button size
        text: "continue_with", // Text style: "Continue with Google"
        shape: "pill",      // Rounded button
      });
    }
  }, []);

  /**
   * Handle Google login response
   * @param {Object} response - Google credential response object
   */
  const handleCredentialResponse = async (response) => {
    try {
      // Decode JWT from Google to extract user information
      const data = parseJwt(response.credential);

      // Validate email presence and verification
      if (!data.email || !data.email_verified) {
        alert("Invalid or unverified email. Please use a valid Google account.");
        return;
      }

      // Build user object
      const user = {
        email: data.email,
        name: data.name || data.email.split("@")[0], // fallback: use email prefix as name
        picture: data.picture || null,
      };

      // Save login state in global store (with provider = "google")
      await login(user, "google");

      // Initialize user application store (drive mode)
      await initAppStore("drive");

      // Redirect user to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Please try again.");
    }
  };

  /**
   * Utility: Decode a JWT (JSON Web Token)
   * @param {string} token - Encoded JWT string
   * @returns {Object} - Decoded payload (user data)
   */
  function parseJwt(token) {
    const base64Url = token.split(".")[1]; // Get payload section of JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Normalize Base64
    const jsonPayload = decodeURIComponent(
      atob(base64) // Decode Base64
        .split("")
        .map(
          (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );
    return JSON.parse(jsonPayload); // Convert to JS object
  }

  return (
    <div className="flex justify-center mt-4">
      {/* Container where Google renders its button */}
      <div
        ref={buttonRef}
        className="shadow-md rounded-xl p-1 bg-white hover:shadow-lg transition"
      ></div>
    </div>
  );
}

export default GoogleLoginButton;