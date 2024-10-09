import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Button, Modal, Form } from "react-bootstrap"; 
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { authData, logout } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPassword, setNewPassword] = useState(""); // Novo campo para a senha

  const handleLogout = () => {
    logout();
  };

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]); // Captura a nova foto selecionada
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value); // Captura a nova senha
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados para o backend para salvar a nova foto e senha
    console.log("Nome:", authData?.username);
    console.log("E-mail:", authData?.email);
    console.log("Nova foto:", newPhoto);
    console.log("Nova senha:", newPassword);
    handleCloseEditModal(); // Fecha o modal após o envio
  };

  return (
    <>
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

        {/* Quadro para a foto do funcionário */}
        <div className="employee-photo-container d-flex flex-column align-items-center">
          <img
            src={authData?.photo || '/default-photo.png'}
            alt="Foto do Funcionário"
            className="employee-photo"
          />
          <Button variant="link" className="p-0 mt-2" onClick={handleShowEditModal}>
            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
            Editar Perfil
          </Button>
        </div>

        {/* Botão de Logout */}
        <Button variant="btn btn-outline-danger" onClick={handleLogout}>
          <FontAwesomeIcon icon={faDoorOpen} className="me-2" />Sair
        </Button>
      </header>

      {/* Modal de Edição de Perfil */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={formatName(authData?.username)}
                readOnly // O campo de nome é apenas leitura
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={authData?.email} // Exibe o e-mail do usuário
                readOnly // O campo de e-mail é apenas leitura
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Atualizar Foto</Form.Label>
              <Form.Control type="file" onChange={handlePhotoChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salvar Alterações
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

function formatName(name) {
  if (!name) {
    return ""; // Retorna um nome padrão se o nome for indefinido ou null
  }

  const parts = name.split('.');
  const formattedParts = parts.map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  return formattedParts.join(' ');
}

export default Header;
