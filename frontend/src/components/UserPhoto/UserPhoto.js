import React, { useState, useEffect } from 'react';
import { Spinner, Image } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons'; // Importe o ícone que você deseja usar
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate para redirecionar
import './UserPhoto.css';

const UserPhoto = ({ authData }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'localhost'; // Pode ser ajustado conforme o ambiente
  const navigate = useNavigate(); // useNavigate hook para redirecionamento

  useEffect(() => {
    if (!authData || !authData.token) {
      console.warn('Token ausente, redirecionando para /autenticacao');
      navigate('/autenticacao'); // Redireciona se não houver token
      return;
    }

    const fetchUserPhoto = async () => {
      console.log('Iniciando a busca da foto do usuário.');

      try {
        const response = await fetch(`http://${apiBaseUrl}:5011/api/User/photo`, {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Token JWT para autorização
          },
        });

        if (response.status === 200) {
          console.log('Foto do usuário encontrada. Processando a imagem.');
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob); // Cria uma URL temporária para o blob
          setPhoto(imageUrl); // Define a URL da imagem
        } else if (response.status === 204) {
          // Se a foto não for encontrada, definimos a foto como null
          console.warn('Foto do usuário não encontrada (204). Usando ícone padrão.');
          setPhoto(null); // Define a foto como null se não houver foto
        } else {
          console.error('Falha ao buscar a foto do usuário. Status:', response.status);
          setError('Erro ao carregar a foto.');
        }
      } catch (err) {
        console.error('Erro ao buscar foto do funcionário:', err);
        setError('Erro ao carregar a foto.');
      } finally {
        setLoading(false);
        console.log('Processo de busca da foto concluído.');
      }
    };

    fetchUserPhoto();
  }, [authData, apiBaseUrl, navigate]);

  if (loading) {
    console.log('Carregando a foto do usuário...');
    return <Spinner animation="border" />;
  }

  if (error) {
    console.error('Erro ao exibir a foto:', error);
    return <p>{error}</p>;
  }

  return (
    <div className="user-photo-container">
      {photo ? (
        <Image src={photo} alt="Foto do Funcionário" className="employee-photo" roundedCircle />
      ) : (
        <div className="user-photo-container employee-photo">
          <PersonFill size={100} /> {/* Ícone padrão quando a foto não está disponível */}
        </div>
      )}
    </div>
  );
};

export default UserPhoto;
