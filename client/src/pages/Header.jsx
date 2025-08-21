import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({name}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonText = name === "Login Page" ? "Sign Up" : "Login";
    const buttonLink = name === "Login Page" ? "/signup" : "/login";


    return (
        <header className="bg-white shadow-sm sticky-top">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light py-3">

                <a className="navbar-brand d-flex align-items-center" href="/">
                    <div className="bg-gradient-primary p-2 rounded me-2">
                        <Brain className="text-white" size={24} />
                    </div>
                    <span className="fs-3 fw-bold text-dark">MockMate</span>
                </a>

                <div className="ms-auto">
                    <Link to={buttonLink} className="btn btn-gradient text-white text-decoration-none">
                        {buttonText}
                    </Link>
                </div>


            </nav>
        </div>
    </header>
    );
};

export default Header;