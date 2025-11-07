import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Homestay India. All rights reserved.</p>
      <p>
        Made with ❤️ by <abbr title="Human Experience">HEX</abbr> | <Link to="/privacy">Privacy Policy</Link> | <Link to="/contact" >Contact Us</Link>
      </p>
    </footer>
  );
};

export default Footer;
