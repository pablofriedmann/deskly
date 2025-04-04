import React from 'react';
import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Deskly logo" className="navbar-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary">Sign Up</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary">Log In</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;