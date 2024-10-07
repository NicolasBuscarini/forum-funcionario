import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBong, faFileText, faFolderOpen, faHome, faPeopleArrows, faPeopleGroup, faPooStorm, faBars } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla a abertura do menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/"></NavLink>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <NavLink className="nav-link" exact to="/">
            <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
            <span className="text">Home</span>
           </NavLink>
           <NavLink className="nav-link" exact to="/rh">
            <span className="icon"><FontAwesomeIcon icon={faPeopleArrows} /></span>
            <span className="text">Recursos Humanos</span>
           </NavLink>

           <NavLink className="nav-link" exact to="/qualidade">
            <span className="icon"><FontAwesomeIcon icon={faBong} /></span>
            <span className="text">Qualidade</span>
           </NavLink>
          <NavLink className="nav-link" exact to="/documentos">
            <span className="icon"><FontAwesomeIcon icon={faFolderOpen} /></span>
            <span className="text">Documentos</span>
           </NavLink>
          <NavLink className="nav-link" exact to="/fique-por-dentro">
            <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
            <span className="text">Fique por Dentro</span>
           </NavLink>
          <NavLink className="nav-link" to="/suporte">
          <span className="icon"><FontAwesomeIcon icon={faPhone} /></span>
            Suporte
          </NavLink>
          <NavLink className="nav-link" to="/postar">
          <span className="icon"><FontAwesomeIcon icon={faFileText} /></span>
            Postar
          </NavLink>
        </div>
        {/* Ícone de "hamburger" à direita */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
