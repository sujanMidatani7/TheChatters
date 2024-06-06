import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBell } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';
import { doSignOut } from '../firebase/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = ({ className }) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const navupdate =()=>
        {
            navigate("/update");
        }
    const handleSignOut = async () => {
        try {
            console.log(auth.currentUser.uid); // Logging the current user's UID
            await doSignOut();
            navigate("/");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

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
                    <li><a onClick={handleSignOut}>Logout</a></li>
                    <li> <a href="" onClick={navupdate}>update</a> </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
