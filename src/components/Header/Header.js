import React from 'react';
import './Header.css'; 
import { title } from '../../config';

const Header = () => {
  return (
    <header>
      <img src="logo.png" alt="Logo" />
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
