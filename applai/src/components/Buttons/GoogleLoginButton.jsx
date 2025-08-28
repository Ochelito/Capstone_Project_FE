import React, { useEffect, useRef } from "react";
import googleicon from "@/assets/googleicon.svg";
import useAuthStore from "@/store/authStore";

function GoogleLoginButton({ onSuccess, allowedEmails = [] }) {
  const buttonRef = useRef(null);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    /* global google */
    if (!window.google) {
      alert("Google login is not available right now. Please refresh or try again later.");
      return;
    }

    if (buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "174014466302-2l3he8lepnhou7uei48a6jj4jj5rdnns.apps.googleusercontent.com", // Replace with your actual client ID
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        { theme: "outline", 
          size: "large", 
          text: "continue_with" }
      );
    }
  }, []);

  function handleCredentialResponse(response) {
    try {
      const data = parseJwt(response.credential);
      
      //sign user in immediately
      if (!data.email || !validateEmailFormat(data.email)) {
        alert("Invalid email format. Please use a valid email address.");
        return;
      }


      if (!data.email_verified) {
        alert("Email not verified. Please verify your Google account.");
        return;
      }

      if (allowedEmails.length > 0 && !allowedEmails.includes(data.email)) {
        alert("Email not allowed. Please use an authorized email address.");
        return;
      }

      login({ name: data.name, email: data.email});
   
      alert(`Welcome ${data.name}!`);
      // Here you can handle the login logic, e.g., send data to your server or
      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.error("Error parsing Google response:", error);
      alert("Login failed. Please try again.");
    }
  }

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  }

  function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleLoginClick() {
    if (window.google) {
      window.google.accounts.id.prompt(); //opens google sing-in popup
    } 
  }

  return (
    <button 
      onClick={handleLoginClick}
      style={{ 
        display: "flex", 
        alignItems: "center",  
        gap: "8px", 
        padding: "10px 20px", 
        background: "#fff", 
        borderRadius: "4px", 
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
        cursor: "pointer" 
      }}>
      <img 
        src={googleicon} 
        alt="Google Icon" 
        style={{ width: "18px", height: "18px", marginLeft: "8px" }}
      />
    </button>
  );
}

export default GoogleLoginButton;