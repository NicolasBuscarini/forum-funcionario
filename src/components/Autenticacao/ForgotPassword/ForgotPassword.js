import React, { useState } from 'react';
import axios from 'axios'; // Certifique-se de que o axios está instalado
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaUser } from 'react-icons/fa'; // Ícone de envelope
import { apiBaseUrl } from '../../../config'; // Importe a URL base da API
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';

const ForgotPassword = ({ username }) => {
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    console.log(`Tentativa de envio de e-mail de verificação para o usuário: ${username}`);
    try {
      const response = await axios.post(`http://${apiBaseUrl}:5011/api/Auth/forgot-password`, {
        username // Envia o username no corpo da requisição
      });

      // Log da resposta da API
      console.log('Resposta da API:', response.data);

      if (response.data.data) {
        setMessage('E-mail de verificação enviado para o seu endereço.');
        console.log('E-mail de verificação enviado com sucesso.');
      } else {
        setMessage(`Erro: ${response.data.error.message}`);
        console.error('Erro ao enviar e-mail de verificação:', response.data.error.message);
      }
    } catch (error) {
      setMessage('Erro ao enviar e-mail de verificação. Tente novamente mais tarde.');
      console.error('Erro ao enviar a solicitação de e-mail:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h3>Esqueci a Senha</h3>
      <CustomInput 
        type="text"
        icon={<FaUser />} // Ícone de usuário
        placeholder="Nome de usuário"
        value={username}
        readOnly // Campo somente leitura
      />
     <CustomButton
        label="Enviar e-mail de verificação" // Texto do botão
        onClick={handleSendEmail} // Função de clique
        className="mt-4" // Classe adicional
      />
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ForgotPassword;
