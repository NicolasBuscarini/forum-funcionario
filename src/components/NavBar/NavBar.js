// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Importa o CSS para estilos

const NavBar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="navbar-links">
          <Link className="nav-link" to="/rh">Recursos Humanos</Link>
          <Link className="nav-link" to="/Documentos">Documentos</Link>
          <Link className="nav-link" to="/T.I.">Serviços e Sistemas</Link>
          <Link className="nav-link" to="/Qualidade">Qualidade</Link>
          <Link className="nav-link" to="/Fique por Dentro">Fique por Dentro</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
