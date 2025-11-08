import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // detects current route
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Scroll effect handler
  useEffect(() => {
   // Only apply scroll effect on home page
    if (location.pathname === "/") {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // On other pages, always show solid navbar
      setIsScrolled(true);
    }
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-solid" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo734311.png" alt="Heemstay Logo" className="logo-img" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/rooms">Rooms</Link></li>

        {user ? (
          <>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
