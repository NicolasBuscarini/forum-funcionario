import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap"; 
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Ícone faHeading
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons/faDoorOpen';

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
          <h3>Bem vindo, {formatName(authData?.username)} !</h3> 
          
        </div>

      </div>
      {/*<img src="/logo_lepuge.jpg" alt="Logo Lepuge" className="header-logo1" />*/}
      {/*<img src="/logo_gemini.jpg" alt="Logo Gemini" className="header-logo2" />*/}

      {/* Botão de Logout com cor vermelha (danger) à direita */}
      <Button variant="danger" onClick={handleLogout} className="ms-auto">
        <FontAwesomeIcon icon={faDoorOpen} className="me-2" />Sair
      </Button>

    </header>
  );
};

function formatName(name) {
  if (!name) {
    return ""; // Retorna um nome padrão se o nome for indefinido ou null
  }
  
  // Separa a string em partes usando o ponto como delimitador
  const parts = name.split('.');

  // Capitaliza a primeira letra de cada parte
  const formattedParts = parts.map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  // Junta as partes com um espaço entre elas
  return formattedParts.join(' ');
}


export default Header;
