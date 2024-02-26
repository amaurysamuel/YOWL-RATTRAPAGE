// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Importer le CSS

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/register" className="button">
                            <span>Register</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="button">
                            <span>Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/home" className="button">
                            <span>Home</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
