import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from "react-bootstrap"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditProfile = ({ show, handleClose, authData }) => {
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPassword, setNewPassword] = useState(""); 
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    validatePhoto(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validatePhoto(file);
  };

  const validatePhoto = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file && !allowedTypes.includes(file.type)) {
      setError("Apenas arquivos JPG e PNG são permitidos.");
      setNewPhoto(null);
      setPhotoPreview(null);
      return;
    }

    if (file && file.size > maxSize) {
      setError("O tamanho máximo da foto é 2MB.");
      setNewPhoto(null);
      setPhotoPreview(null);
      return;
    }

    setError(null);
    setNewPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o loading

    const formData = new FormData();
    formData.append('RaNome', authData.username); // ou o valor correspondente
    formData.append('UserProtheusId', authData.userProtheusId); // adicione o ID do usuário
    formData.append('Email', authData.email); // ou o valor correspondente
    if (newPhoto) {
      formData.append('Foto', newPhoto);
    }
    if (newPassword) {
      formData.append('NovaSenha', newPassword); // ajuste conforme a API
    }

    try {
      const response = await fetch(`http://localhost:5011/api/User`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authData.token}`, // Token JWT para autorização
          'Accept': 'text/plain',
        },
        body: formData,
      });

      if (response.ok) {
        // Processa a resposta como necessário
        console.log("Perfil atualizado com sucesso.");
        handleClose(); // Fecha o modal
      } else {
        const errorMessage = await response.text();
        setError(`Erro ao atualizar o perfil: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao atualizar o perfil.');
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={formatName(authData?.username)}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Atualizar Foto</Form.Label>
            <div
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Pré-visualização"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ) : (
                "Arraste e solte uma foto aqui ou clique para selecionar."
              )}
              <Form.Control
                type="file"
                onChange={handlePhotoChange}
                style={{ display: "none" }} // Esconde o input de arquivo
              />
            </div>
          </Form.Group>

         
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : <FontAwesomeIcon icon={faSave} className="me-2" />}Salvar Alterações
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
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

export default EditProfile;
