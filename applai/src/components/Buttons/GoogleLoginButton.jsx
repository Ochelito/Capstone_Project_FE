import React, { useEffect, useRef } from "react";
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
      alert(
        "Google login is not available right now. Please refresh or try again later."
      );
      return;
    }

    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id:
        "174014466302-2l3he8lepnhou7uei48a6jj4jj5rdnns.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Render Google button
    if (buttonRef.current) {
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

      const user = {
        email: data.email,
        name: data.name || data.email.split("@")[0],
        picture: data.picture || null,
      };

      // 🔑 make sure we wait for store update
      await login(user, "google");

      // Initialize app store after login is confirmed
      await initAppStore("drive");

      // Navigate only after login + store init
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Please try again.");
    }
  };

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(
          (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  return <div ref={buttonRef}></div>;
}

export default GoogleLoginButton;