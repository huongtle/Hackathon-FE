import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Symptom Triage</div>
      <ul className="nav-links">
        <li><Link to="/">Triage</Link></li>
        <li><Link to="/dashboard">Analytics Dashboard</Link></li>
        <li><Link to="/info">Personal Info</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;