import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <p>
          <span className="company-name">E-shop Product Feedback </span>
        </p>
        <p>
          <span className="company-salutation">We The Best</span>
        </p>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/home">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
        <li className="navbar-item"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;