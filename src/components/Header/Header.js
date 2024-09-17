import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap"; 
import "./Header.css";

const Header = () => {
  const { authData, logout } = useContext(AuthContext); // Adicionando logout ao contexto

  const handleLogout = () => {
    logout(); // Chama a função de logout ao clicar no botão
  };

  return (
    <header className="header-container d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
      <img src="/puribmp.png" alt="Logo Purifarma" className="header-logo" />
        <div className="header-text ms-3">
        
          <h1 className="header-title">
            
            INTRANET CORPORATIVO - Portal do Colaborador                            
          </h1>
          <h2 className="header-subtitle">Sua conexão com a Empresa</h2>
          <h3>Bem vindo, {authData?.username} !</h3> 
          
        </div>

      </div>
      <img src="/logo_Lepuge.jpg" alt="Logo Lepuge" className="header-logo" />
      <img src="/logo_gemini.jpg" alt="Logo Gemini" className="header-logo" />

      {/* Botão de Logout com cor vermelha (danger) à direita */}
      <Button variant="danger" onClick={handleLogout} className="ms-auto">
        Sair
      </Button>
    </header>
  );
};

export default Header;
