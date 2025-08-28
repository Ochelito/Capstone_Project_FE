import React from 'react';
import LoginForm from '@/components/forms/LoginForm';
import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import useAuthStore from '@/store/authStore';
import useApplicationStore from '@/store/applicationStore';

function Login() {
    const login = useAuthStore(state => state.login);
    const initApplications = useApplicationStore(state => state.init);

    const handleEmailLogin = (email) => {
        // Authenticate email/password (dummy example here)
        login({ email, method: "local" });
        initApplications("local");  // load from localStorage
    };

    const handleGoogleLogin = (userData) => {
        login({ ...userData, method: "google" });
        initApplications("drive");   // load from Google Drive
    };

    return (
        <div className="login-page">
            <div>
                <img src="./assets/logo.png" alt="Logo" />
                <h1>Start tracking your Job Applications for FREE</h1>
                <p>Register automatically with your Google Account credentials or Login if an existing User.</p>

                <LoginForm onLogin={handleEmailLogin} />
                <button onClick={() => handleEmailLogin(document.getElementById("email").value)}>
                    Login
                </button>

                <div>
                    <span></span>
                    <p>or continue with</p>
                    <span></span>
                </div>
                
                <GoogleLoginButton onSuccess={handleGoogleLogin} />
            </div>
            
            <div className="login-image">
                <img src="./assets/login-image.png" />
            </div>
        </div>
    );
}

export default Login;