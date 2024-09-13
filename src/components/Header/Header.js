// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <img src="/puribmp.png" alt="Logo Purifarma" className="header-logo" /> {/* Certifique-se de que o caminho está correto */}
      <div className="header-text">
        <h1 className="header-title">INTRANET CORPORATIVO - Portal do Colaborador</h1>
        <h2 className="header-subtitle">Sua conexão com a Empresa</h2>
      </div>
    </header>
  );
};

export default Header;
