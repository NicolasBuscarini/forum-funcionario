import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHome, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';

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
           <NavLink className="nav-link" exact to="/Rh">
            <span className="icon"><FontAwesomeIcon icon={faPeopleGroup} /></span>
            <span className="text">Recursos Humanos</span>
           </NavLink>

           <NavLink className="nav-link" exact to="/Qualidade">
            <span className="icon"><FontAwesomeIcon icon={faCirclePlus} /></span>
            <span className="text">Qualidade</span>
           </NavLink>
          <NavLink className="nav-link" exact to="/Documentos">
            <span className="icon"><FontAwesomeIcon icon={faFolderOpen} /></span>
            <span className="text">Documentos</span>
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
