import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="androide.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li className="navbar-link"><Link to="/">Home</Link></li>
        <li className="navbar-link"><Link to="/products">Products</Link></li>
        <li className="navbar-link"><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

