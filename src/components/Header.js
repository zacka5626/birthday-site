import React from 'react';
import './Header.css';

const Header = ({ name, message }) => {
  return (
    <header className="header">
      <h1>Happy Birthday, {name || "My Love"}! 🤗</h1>
      <p>{message || "Here's to another year of love, laughter, and unforgettable memories."}</p>
    </header>
  );
};

export default Header;
