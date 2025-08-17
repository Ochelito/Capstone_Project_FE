import React from 'react';
import LoginForm from './components/Forms/LoginForm';
import GoogleLoginButton from './components/Buttons/GoogleLoginButton';
import SubmitButton from './components/Buttons/SubmitButton';
import useAuthStore from '../store/authStore';

function Login() {
    const { user } = useAuthStore();

    return (
        <div className="login-page">
            <div>
                <img src="./assets/logo.png" alt="Logo" />
                <h1>Start tracking your Job Applications for FREE</h1>
                <p>Register authomatically with your Google Account credentials or Login if an existing User.</p>
                <LoginForm />
                <SubmitButton />
                <div>
                    <span></span>
                    <p>or continue with</p>
                    <span></span>
                </div>
                <GoogleLoginButton />
            </div>
            
            <div className="login-image">
                <img src="./assets/login-image.png" />
            </div>
        </div>
    );
}

export default Login;