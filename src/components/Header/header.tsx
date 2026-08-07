import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/index.png";
import "./header.css";

interface HeaderProps {
    toggleSidebar?: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [userName, setUserName] = useState("Admin User");
    const [userInitial, setUserInitial] = useState("A");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        window.location.href = "/login";
    };

    // Load user data on mount
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.name) {
                    setUserName(user.name);
                    setUserInitial(user.name.charAt(0).toUpperCase());
                }
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <header className="modern-header">
            <div className="header-left">
                <button
                    className="sidebar-toggle-btn"
                    onClick={toggleSidebar}
                    title="Toggle Sidebar"
                >
                    <i className="bi bi-list"></i>
                </button>
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo"
                        className="header-logo"
                    />
                </div>
                <span className="header-title text-uppercase d-none d-md-block">
                    Banphool Foundation
                </span>
            </div>

            <div className="header-right">
                <select className="language-selector d-none d-sm-block" aria-label="Select Language">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="bn">বাংলা</option>
                </select>
                <button
                    className="header-action-btn d-none d-sm-flex"
                    onClick={handleFullscreenToggle}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                    <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
                </button>

                <div className="profile-container" ref={dropdownRef}>
                    <div
                        className="user-profile"
                        title={userName}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        <div className="avatar">{userInitial}</div>
                        <span className="user-name d-none d-md-block fw-semibold text-dark">{userName}</span>
                        <i className="bi bi-chevron-down text-muted d-none d-md-block" style={{ fontSize: '0.8rem' }}></i>
                    </div>

                    {isDropdownOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-menu-item">
                                <i className="bi bi-person"></i>
                                <span>Profile</span>
                            </div>
                            <div className="profile-menu-divider"></div>
                            <div className="profile-menu-item text-danger" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
