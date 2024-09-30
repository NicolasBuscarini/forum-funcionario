import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ username }) => {
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirecionamento

  const handleLogin = async () => {
    console.log(`[Login] Tentando login com usuário: ${username}`); // Log de tentativa de login
    try {
      await login(username, password); // Usar a função de login do AuthContext
      console.log(`[Login] Login bem-sucedido, redirecionando para a Home.`); // Log de sucesso
      navigate('/'); // Redirecionar para a página inicial
    } catch (error) {
      setError('Erro ao realizar login.');
      console.error(`[Login] Erro ao realizar login para o usuário: ${username}, Erro: ${error}`); // Log de erro
    }
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleLogin}>
        Entrar
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Login;
