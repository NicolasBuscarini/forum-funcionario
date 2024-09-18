// Footer.js
import React from 'react';
import './Footer.css'; // Crie esse arquivo CSS para estilizar o componente
import { title } from '../../config';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 {title}. Todos os direitos reservados.</p> <img src="/puripreto.png"  />
      
    </footer>
  );
};

export default Footer;
