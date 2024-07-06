import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-header">Unauthorized</h1>
      <p className="unauthorized-message">You do not have access to this page.</p>
      <Link to="/" className="unauthorized-link">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
