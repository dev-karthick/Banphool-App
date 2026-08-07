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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // In React (Vite), environment variables are accessed via import.meta.env
            // This is similar to Angular's environment.ts files
            const apiUrl = import.meta.env.VITE_API_URL;

            // Using standard fetch API, which is similar to Angular's HttpClient
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }

            // Store the tokens returned from the API response
            localStorage.setItem('accessToken', data.data.accessToken);
            if (data.data.refreshToken) {
                localStorage.setItem('refreshToken', data.data.refreshToken);
            }
            if (data.data.user) {
                localStorage.setItem('user', JSON.stringify(data.data.user));
            }

            // Notify parent component to update auth state
            onLogin();

            // Navigate to dashboard
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || 'An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
        // onLogin()
        // navigate("/dashboard");
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
                        {error && (
                            <div className="alert alert-danger p-2 mb-3" style={{ fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="text"
                                id="email"
                                className="premium-input"
                                placeholder="admin@banphool.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;
