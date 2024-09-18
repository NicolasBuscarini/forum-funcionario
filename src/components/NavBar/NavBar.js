import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/"></NavLink>
        <div className="navbar-links">
          <NavLink className="nav-link" exact to="/">
            <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
            <span className="text">Home</span>
           </NavLink>
          <NavLink className="nav-link" to="/rh">
            Recursos Humanos
          </NavLink>
          <NavLink className="nav-link" to="/documentos">
            Documentos
          </NavLink>
          <NavLink className="nav-link" to="/Qualidade">
            Qualidade
          </NavLink>
          <NavLink className="nav-link" to="/Fique por Dentro">
            Fique por Dentro 
          </NavLink>
          <NavLink className="nav-link" to="/Suporte">
            Suporte
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
