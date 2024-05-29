import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBell } from '@fortawesome/free-solid-svg-icons'; // Import the bell icon
import '../styles/header.css'; // Adjust the path if necessary

const Header = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`header ${className}`}>
            <div className="header-content">
                <FontAwesomeIcon icon={faHome} className="header-icon" />
                <h1 className="header-title">My Website</h1>
                <FontAwesomeIcon icon={faBell} className="header-menu-icon" /> {/* Bell icon */}
                <FontAwesomeIcon icon={faBars} className="header-menu-icon" onClick={toggleMenu} />
            </div>
            <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#help">Help</a></li>
                    <li><a href="#suggestions">Suggestions</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
