import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHome } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';

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
          <NavLink className="nav-link" exact to="/Documentos">
            <span className="icon"><FontAwesomeIcon icon={faFolderOpen} /></span>
            <span className="text">Documentos</span>
           </NavLink>
          <NavLink className="nav-link" to="/Qualidade">
            Qualidade
          </NavLink>
          <NavLink className="nav-link" exact to="/Fique por Dentro">
            <span className="icon"><FontAwesomeIcon icon={faCalendarWeek} /></span>
            <span className="text">Fique por Dentro</span>
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
