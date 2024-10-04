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
           <NavLink className="nav-link" exact to="/rh">
            <span className="icon"><FontAwesomeIcon icon={faPeopleGroup} /></span>
            <span className="text">Recursos Humanos</span>
           </NavLink>

           <NavLink className="nav-link" exact to="/qualidade">
            <span className="icon"><FontAwesomeIcon icon={faCirclePlus} /></span>
            <span className="text">Qualidade</span>
           </NavLink>
          <NavLink className="nav-link" exact to="/documentos">
            <span className="icon"><FontAwesomeIcon icon={faFolderOpen} /></span>
            <span className="text">Documentos</span>
           </NavLink>
          <NavLink className="nav-link" exact to="/fique-por-dentro">
            <span className="icon"><FontAwesomeIcon icon={faCalendarWeek} /></span>
            <span className="text">Fique por Dentro</span>
           </NavLink>
          <NavLink className="nav-link" to="/suporte">
            Suporte
          </NavLink>
          <NavLink className="nav-link" to="/postar">
            postar
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
