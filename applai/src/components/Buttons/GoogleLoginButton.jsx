import React, { useEffect, useRef } from "react";
import googleicon from "@/assets/googleicon.svg";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const buttonRef = useRef(null);
  const login = useAuthStore((state) => state.login);
  const initAppStore = useApplicationStore((state) => state.init);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) {
      alert("Google login is not available right now. Please refresh or try again later.");
      return;
    }

    if (buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // replace with your actual client ID
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
      });
    }
  }, []);

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
        name: data.name,
        picture: data.picture || null,
      };

      // 🔹 Log in user
      login(user, "google");

      // 🔹 Initialize Google Drive application store
      await initAppStore("drive");

      // 🔹 Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed. Please try again.");
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

  const handleLoginClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // opens Google One Tap / popup
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleLoginClick}
    >
      <img
        src={googleicon}
        alt="Google Icon"
        style={{ width: "18px", height: "18px", marginLeft: "8px" }}
      />
    </button>
  );
}

export default GoogleLoginButton;