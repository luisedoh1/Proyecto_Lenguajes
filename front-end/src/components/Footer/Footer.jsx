import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Guardian Tech. Todos los derechos reservados.</p>
        <p>C13822 - C17337 - C18193 - C21086</p>
      </div>
    </footer>
  );
};

export default Footer;