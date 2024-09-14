// Header.js
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { authData } = useContext(AuthContext);

  return (
    <header className="header-container">
      <img src="/puribmp.png" alt="Logo Purifarma" className="header-logo" />
      <div className="header-text">
        <h1 className="header-title">
          INTRANET CORPORATIVO - Portal do Colaborador
        </h1>
        <h2 className="header-subtitle">Sua conexão com a Empresa</h2>
        <h3>Bem vindo, {authData?.username}</h3>
      </div>
    </header>
  );
};

export default Header;
