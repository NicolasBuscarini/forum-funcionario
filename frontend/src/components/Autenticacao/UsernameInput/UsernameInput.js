import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import { FaUser } from 'react-icons/fa'; // Importa ícone de usuário (FontAwesome)
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';

const UsernameInput = ({ onUserVerified }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleUsernameCheck = async () => {
    console.log(`[UsernameInput] Verificando usuário: ${username}`); // Log de início da verificação
    try {
      const response = await axios.get(`http://${apiBaseUrl}:5011/api/Auth/VerificarCadastro/${username}`);
      const status = response.data.data.status;

      console.log(`[UsernameInput] Status do usuário: ${status}`); // Log do status recebido
      if (status === 'USUARIO_NAO_ENCONTRADO') {
        setError('Usuário não encontrado.');
        console.warn(`[UsernameInput] Usuário não encontrado: ${username}`); // Log de usuário não encontrado
      } else {
        setError('');
        onUserVerified(status, username); // Envia o status e o username digitado para o callback
        console.log(`[UsernameInput] Usuário verificado com sucesso: ${username}, Status: ${status}`); // Log de sucesso
      }
    } catch (error) {
      setError('Erro ao verificar o usuário.');
      console.error(`[UsernameInput] Erro ao verificar usuário: ${username}, Erro: ${error}`); // Log de erro
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">

      <CustomInput 
        type="text"
        icon={<FaUser />} // Ícone de usuário
        placeholder="Digite seu nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <CustomButton
        label="Entrar" // Texto do botão
        onClick={handleUsernameCheck} // Função de clique
        className="mt-4" // Classe adicional
      />
      
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default UsernameInput;
