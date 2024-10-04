import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomInput from './CustomInput'; // Importando o componente de input personalizado
import CustomButton from './CustomButton'; // Importando o componente de botão personalizado
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const { token, username } = useParams(); // Obtendo os parâmetros da URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

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

    const data = await response.json();

    if (data.error) {
      setError(data.error.message); // Exibindo mensagem de erro
    } else {
      // Lógica para redirecionar ou mostrar mensagem de sucesso
      alert('Senha redefinida com sucesso!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Redefinir Senha</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuário</label>
          <input type="text" value={username} readOnly className="form-control" />
        </div>
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
