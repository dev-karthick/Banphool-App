import React, { useState } from 'react';
import './login.css';
import bgImage from '../../assets/logo.png';
import logoImage from '../../assets/index.png';
import { useNavigate } from 'react-router-dom';

type Props = {
    onLogin: () => void;
};

function Login({ onLogin }: Props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Bypassing the email/password check!
        // This tells App.tsx that you are logged in, unlocking the protected routes
        onLogin();
        
        // Now that the router is unlocked, navigate to the dashboard
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-image-section">
                <img src={bgImage} alt="Banphool Background" className="login-image" />
            </div>

            <div className="login-form-section">
                <div className="login-card">
                    <div className="login-logo-container">
                        <img src={logoImage} alt="Banphool Logo" className="login-logo" />
                        <h3>Sign In</h3>
                        <p>Welcome to Banphool Admin</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="premium-input"
                                placeholder="admin@banphool.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            // required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="premium-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                // required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="login-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
