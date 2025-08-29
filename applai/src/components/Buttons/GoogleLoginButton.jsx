import React, { useEffect, useRef } from "react";
import googleicon from "@/assets/googleicon.svg";
import useAuthStore from "@/store/authStore";
import useApplicationStore from "@/store/applicationStore";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const buttonRef = useRef(null); // container for the Google button
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
      client_id: "174014466302-2l3he8lepnhou7uei48a6jj4jj5rdnns.apps.googleusercontent.com", // ✅ client_id as string
      callback: handleCredentialResponse,
    });

    // Render Google button inside the div
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

      // Log in and init Google Drive store
      login(user, "google");
      await initAppStore("drive");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed. Please try again.");
    }
  };

  // decode JWT
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

  // manual popup trigger
  const handleLoginClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // ✅ manual popup
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* div container for the Google button */}
      <div ref={buttonRef}></div>

      {/* Optional extra clickable icon */}
      <button onClick={handleLoginClick}>
        <img
          src={googleicon}
          alt="Google Icon"
          style={{ width: "18px", height: "18px" }}
        />
      </button>
    </div>
  );
}

export default GoogleLoginButton;