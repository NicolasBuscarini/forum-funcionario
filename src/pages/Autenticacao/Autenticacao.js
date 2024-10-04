import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../../components/Autenticacao/Login/Login';
import Register from '../../components/Autenticacao/Register/Register';
import UsernameInput from '../../components/Autenticacao/UsernameInput/UsernameInput';
import ForgotPassword from '../../components/Autenticacao/ForgotPassword/ForgotPassword';
import "./Autenticacao.css"
const Autenticacao = () => {
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Controla se a tela de esqueci a senha é exibida

  const handleUserVerified = (userStatus, enteredUsername) => {
    console.log(`[Autenticacao] Usuário verificado, status: ${userStatus}, username: ${enteredUsername}`);
    setUsername(enteredUsername);
    setStatus(userStatus);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true); // Atualiza o estado para esconder o Login e exibir ForgotPassword
  };

  return (
    <div className="container autenticacao-container">
      <h1 className="title">INTRANET</h1>
      {/* <h3 className="subtitle">Boas-vindas</h3> */}

      {!isForgotPassword && !status && <UsernameInput onUserVerified={handleUserVerified} />}
      {!isForgotPassword && status === 'USUARIO_REGISTRADO' && (
        <Login username={username} onForgotPassword={handleForgotPassword} /> // Passa a função para exibir ForgotPassword
      )}
      {!isForgotPassword && status === 'USUARIO_NAO_REGISTRADO' && <Register username={username} />}
      {isForgotPassword && <ForgotPassword username={username} />} {/* Exibir apenas ForgotPassword */}
    </div>
  );
};

export default Autenticacao;
