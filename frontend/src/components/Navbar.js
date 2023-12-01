// src/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="navbar">
      <div className="logo">
        
        <h1>Pandemic Pulse</h1>
        {/* <img src="logo.png" alt="Website Logo" /> */}
      </div>
      <div className="nav-links">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        
        <Link to="/covid-cases-trends" className={location.pathname === '/covid-cases-trends' ? 'active' : ''}>
          Covid-19 Cases
        </Link>
        <Link
          to="/lockdowns-trends"
          className={
            location.pathname === '/lockdowns-trends' ? 'active' : ''
          }
        >
        Lockdowns
        </Link>
        <Link to="/vaccination-trends" className={location.pathname === '/vaccination-trends' ? 'active' : ''}>
          Vaccination
        </Link>
        <Link
          to="/demographics-trends"
          className={
            location.pathname === '/demographics-trends' ? 'active' : ''
          }
        >
         Demographics
        </Link>

        <Link
          to="/data-overview"
          className={
            location.pathname === '/data-overview' ? 'active' : ''
          }
        >
         Data Overview
        </Link>
        
        
      </div>

      {/* <div className="time-range-selector"></div> */}
     
    </div>
  );
}

export default Navbar;
