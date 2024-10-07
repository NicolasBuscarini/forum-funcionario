import React, { useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import { apiBaseUrl } from '../../config';
import { FaLock, FaUser } from 'react-icons/fa';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import "./ResetPassword.css"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const navigate = useNavigate();

  const query = useQuery();
  const token = query.get('token');
  const username = query.get('username');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log para início do processo
    console.log('Iniciando processo de redefinição de senha', { username, token });

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      console.error("As senhas não coincidem.");
      setError("As senhas não coincidem.");
      return;
    }

    // Log antes de enviar a requisição
    console.log('Enviando requisição de redefinição de senha para API', { username, token });

    try {
      const response = await fetch(`http://${apiBaseUrl}:5011/api/Auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
        body: JSON.stringify({
          username: username,
          token: token,
          password: password,
        }),
      });

      // Log de resposta da API
      console.log('Resposta recebida da API:', response);

      const data = await response.json();

      if (data.error) {
        // Log de erro vindo da API
        console.error('Erro na redefinição de senha:', data.error);
        setError(data.error.message);
      } else {
        // Log de sucesso
        console.log('Senha redefinida com sucesso para o usuário:', username);
        alert('Senha redefinida com sucesso!');
        // Redirecionar para /autenticacao após o alerta
        navigate('/autenticacao');
      }
    } catch (error) {
      // Log de erro de exceção
      console.error('Erro ao realizar a requisição de redefinição de senha:', error);
      setError('Ocorreu um erro ao tentar redefinir a senha. Tente novamente.');
    }
  };

  return (
    <div className="container autenticacao-container">
      <h1 className="title">INTRANET</h1>
      <h2>Redefinir Senha</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <CustomInput 
          type="text"
          icon={<FaUser />} // Ícone de usuário
          placeholder="Usuário"
          value={username}
          readOnly // Campo somente leitura
        />

        <CustomInput 
          type="password" 
          placeholder="Nova Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          isPassword={true} 
          icon={<FaLock />} 
        />
        <CustomInput
          type="password" 
          placeholder="Confirmar Senha" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          isPassword={true} 
          icon={<FaLock />} 
        />
        <CustomButton label="Redefinir Senha" type="submit" />
      </form>
    </div>
  );
};

export default ResetPassword;
