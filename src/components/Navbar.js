import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from './LoginModal';
import LanguageSelector from './LanguageSelector';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span>VideoDownloader</span>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          {user && <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>}
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <Link to="/faq" onClick={closeMobileMenu}>FAQ</Link>
          
          <div className="nav-actions">
            <LanguageSelector />
            
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {user ? (
              <div className="user-menu">
                <button onClick={() => setShowMenu(!showMenu)} className="user-btn">
                  <FaUser /> <span className="user-name">{user.name}</span>
                </button>
                {showMenu && (
                  <div className="dropdown-menu">
                    <button onClick={() => { logout(); closeMobileMenu(); }}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link 
                  to="/signup" 
                  className="btn btn-secondary"
                  onClick={closeMobileMenu}
                >
                  Sign up/Login
                </Link>
               
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        initialTab="login"
      />
    </nav>
  );
};

export default Navbar;
