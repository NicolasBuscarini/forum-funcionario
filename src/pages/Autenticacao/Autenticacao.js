import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../../components/Autenticacao/Login/Login';
import Register from '../../components/Autenticacao/Register/Register';
import UsernameInput from '../../components/Autenticacao/UsernameInput/UsernameInput';

const Autenticacao = () => {
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');

  const handleUserVerified = (userStatus, enteredUsername) => {
    console.log(`[Autenticacao] Usuário verificado, status: ${userStatus}, username: ${enteredUsername}`); // Log de verificação do usuário
    setUsername(enteredUsername); // Armazena o username digitado pelo usuário
    setStatus(userStatus); // Armazena o status do usuário
  };

  return (
    <div className="container">
      {!status && <UsernameInput onUserVerified={handleUserVerified} />}
      {status === 'USUARIO_REGISTRADO' && <Login username={username} />}
      {status === 'USUARIO_NAO_REGISTRADO' && <Register username={username} />}
    </div>
  );
};

export default Autenticacao;
