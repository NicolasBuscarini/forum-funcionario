import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; 
import { FaUser, FaLock, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';

const Login = ({ username, onForgotPassword }) => { // Recebe a prop onForgotPassword
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    console.log(`[Login] Tentando login com usuário: ${username}`);
    try {
      await login(username, password); 
      console.log(`[Login] Login bem-sucedido, redirecionando para a Home.`);
      navigate('/'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error.message || 'Erro ao realizar login.');
        console.error(`[Login] Erro da API: ${error.response.data.error.message}`);
      } else {
        setError('Algo deu errado no serviço de autenticação. Contate o administrador.');
        console.error(`[Login] Erro ao realizar login: ${error}`);
      }
    }
  };

  return (
    <div className="login-container">
     
      <CustomInput 
        type="text"
        icon={<FaUser />} // Ícone de usuário
        placeholder="Digite seu nome"
        value={username}
        readOnly // Campo somente leitura
      />

      <CustomInput 
        isPassword={true} // Define que é um campo de senha
        icon={<FaLock />} // Ícone de senha
        placeholder="Informe sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <CustomButton
        label="Entrar" // Texto do botão
        onClick={handleLogin} // Função de clique
        className="mt-4" // Classe adicional
      />

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="forgot-password mt-3">
        <button 
          className="forgot-password-link btn btn-link" 
          onClick={onForgotPassword} // Chama a função onForgotPassword
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
  );
};

export default Login;
