import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
// import './Header.css';
import '../styles/header.css';

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
                <FontAwesomeIcon icon={faBars} className="header-menu-icon" onClick={toggleMenu} />
            </div>
            <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
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
