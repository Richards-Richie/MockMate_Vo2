import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <div className="bg-gradient-primary p-2 rounded me-2">
              <Brain className="text-white" size={24} />
              {/* <BrainCircuit /> */}
            </div>
            <span className="fs-3 fw-bold text-dark">MockMate</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto me-4">
              <li className="nav-item">
                <a className="nav-link text-secondary fw-medium" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary fw-medium" href="#how-it-works">How It Works</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link text-secondary fw-medium" href="#testimonials">Testimonials</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link text-secondary fw-medium" href="login">Login</a>
              </li>
            </ul>
            <button className="btn btn-gradient" > 
              <a href="signup" className="text-white text-decoration-none">Sign Up</a>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;