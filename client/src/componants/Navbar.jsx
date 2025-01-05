import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);

    // Check if the user is logged in by checking for a token or some auth status
    const token = localStorage.getItem('token'); // or however you store auth status
    if (token) {
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setIsLoggedIn(false);
    setActiveLink('/'); // Redirect to home after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand-x" href="#">CriQuiz</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!isLoggedIn ? (
                <>
                  <li className={`nav-item ${activeLink === '/' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/" onClick={() => handleClick('/')}>Home</Link>
                  </li>
                  <li className={`nav-item ${activeLink === '/register' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/register" onClick={() => handleClick('/register')}>Register</Link>
                  </li>
                  <li className={`nav-item ${activeLink === '/login' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/login" onClick={() => handleClick('/login')}>Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={`nav-item ${activeLink === '/quiz' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/quiz" onClick={() => handleClick('/quiz')}>Quiz</Link>
                  </li>
                  <li className={`nav-item ${activeLink === '/about' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/about" onClick={() => handleClick('/about')}>About</Link>
                  </li>
                  <li className={`nav-item ${activeLink === '/contact' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/contact" onClick={() => handleClick('/contact')}>Contact</Link>
                  </li>
                  <li className={`nav-item ${activeLink === '/profile' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/profile" onClick={() => handleClick('/profile')}>Profile</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
