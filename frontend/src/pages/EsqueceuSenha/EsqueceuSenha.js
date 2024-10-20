import React, { useState } from 'react';
import axios from 'axios'; // Certifique-se de que o axios está instalado
import { apiBaseUrl } from '../../config';

const EsqueceuSenha = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    console.log('Tentativa de recuperação de senha para o usuário:', username); // Log do username

    try {
      const response = await axios.post(`http://${apiBaseUrl}:5011/api/Auth/forgot-password`, {
        username // Envia o username no corpo da requisição
      });

      console.log('Resposta da API:', response.data); // Log da resposta da API

      // Verifica a estrutura da resposta e exibe a mensagem adequada
      if (response.data.data) {
        setMessage('Um e-mail de recuperação de senha foi enviado para o usuário informado.');
        console.log('E-mail de recuperação enviado com sucesso.'); // Log de sucesso
      } else {
        setMessage(`Erro: ${response.data.error.message}`); // Exibe mensagem de erro caso haja
        console.error('Erro ao enviar e-mail de recuperação:', response.data.error.message); // Log de erro
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação de recuperação:', error); // Log de erro da requisição
      setMessage('Erro ao enviar solicitação de recuperação. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Recuperar Senha</h1>
      <p>Digite o username cadastrado para receber as instruções de recuperação de senha.</p>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu username"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleForgotPassword}>
        Enviar
      </button>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default EsqueceuSenha;
