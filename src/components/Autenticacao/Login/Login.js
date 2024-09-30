import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; 
import { FaUser, FaLock, FaEyeSlash } from 'react-icons/fa'; // Ícones de usuário, senha e olho
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Adicionar o CSS customizado

const Login = ({ username }) => {
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Para alternar a visualização da senha
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
    <div className="login-container">
      <h1 className="title">INTRANET</h1>
      <h3 className="subtitle">Boas-vindas</h3>

      <div className="form-group position-relative mt-4">
        <FaUser className="input-icon" /> {/* Ícone de usuário */}
        <input
          type="text"
          className="form-control custom-input pl-5" // Ajuste do padding para ícone
          value={username}
          readOnly // Campo somente leitura
          placeholder="Digite seu nome"
        />
      </div>

      <div className="form-group position-relative mt-3">
        <FaLock className="input-icon" /> {/* Ícone de senha */}
        <input
          type={showPassword ? "text" : "password"} // Alternar entre texto e senha
          className="form-control custom-input pl-5" // Ajuste do padding para ícone
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe sua senha"
        />
        <FaEyeSlash
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)} // Alternar visualização
        />
      </div>

      <button className="btn btn-primary btn-block custom-btn mt-4" onClick={handleLogin}>
        Entrar
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Login;
