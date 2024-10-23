// Header.js
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap"; 
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import UserPhoto from '../UserPhoto/UserPhoto'; // Importa o novo componente
import EditProfile from '../EditProfile/EditProfile'; // Importa o novo componente

const Header = () => {
  const { authData, logout } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleProfileSubmit = (newPhoto, newPassword) => {
    // Lógica para salvar a nova foto e senha
    console.log("Nova foto:", newPhoto);
    console.log("Nova senha:", newPassword);
  };

  return (
    <>
      <header className="header-container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src="/puribmp_transparente.png" alt="Logo Purifarma" className="header-logo" />
          <div className="header-text ms-3">
            <h1 className="header-title">
              Portal do Colaborador
            </h1>

            <h3>{formatName(authData?.username)} !</h3> 
          </div>
        </div>

        {/* Quadro para a foto do funcionário */}
        <div className="employee-photo-container d-flex flex-column align-items-center">
          <UserPhoto authData={authData} /> {/* Usa o componente UserPhoto */}
          <Button variant="link" className="p-0 mt-2" onClick={handleShowEditModal}>
            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
            Editar Perfil
          </Button>
        </div>

        {/* Botão de Logout */}
        <Button variant="btn btn-danger" onClick={handleLogout}>
          <FontAwesomeIcon icon={faDoorOpen} className="me-2" />Sair
        </Button>
      </header>

      {/* Modal de Edição de Perfil */}
      <EditProfile
        show={showEditModal}
        handleClose={handleCloseEditModal}
        authData={authData}
        onSubmit={handleProfileSubmit} // Passa a função de submissão
      />
    </>
  );
};

// Função para formatar o nome
const formatName = (name) => {
  if (!name) {
    return "";
  }
  const parts = name.split('.');
  const formattedParts = parts.map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });
  return formattedParts.join(' ');
};

export default Header;
