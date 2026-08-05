import { useState, useRef, useEffect } from "react";
import logo from "../../assets/index.png";
import "./header.css";

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="modern-header">
            <div className="header-left">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo"
                        className="header-logo"
                    />
                </div>
                <span className="header-title text-uppercase">
                    Banphool Foundation
                </span>
            </div>
            <div className="header-right">
                <div className="profile-container" ref={dropdownRef}>
                    <div
                        className="user-profile"
                        title="Admin User"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="avatar">A</div>
                    </div>

                    {isDropdownOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-menu-item">
                                <i className="bi bi-person"></i>
                                <span>Profile</span>
                            </div>
                            <div className="profile-menu-divider"></div>
                            <div className="profile-menu-item text-danger">
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
