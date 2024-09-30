import React, { useState } from 'react';
import axios from 'axios';

const UsernameInput = ({ onUserVerified }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
  
    const handleUsernameCheck = async () => {
      console.log(`[UsernameInput] Verificando usuário: ${username}`); // Log de início da verificação
      try {
        const response = await axios.get(`http://localhost:5011/api/Auth/VerificarCadastro/${username}`);
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
      <div className="container mt-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={handleUsernameCheck}>
          Verificar
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    );
  };
  
export default UsernameInput;