import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MedQ - AI Doctor Assistant</div>
      <div className="nav-links">WebMedi Team</div>
    </nav>
  );
}

export default Navbar;