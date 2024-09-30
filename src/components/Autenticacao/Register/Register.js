import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ username }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      return passwordRegex.test(password);
    };
  
    const handleRegister = async () => {
      console.log(`[Register] Tentando registrar usuário: ${username}`); // Log de tentativa de registro
  
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        console.warn(`[Register] As senhas não coincidem para o usuário: ${username}`); // Log de erro de senha
        return;
      }
  
      if (!validatePassword(password)) {
        setError('A senha deve ter pelo menos 5 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
        console.warn(`[Register] Senha não atende aos requisitos para o usuário: ${username}`); // Log de erro de senha
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:5011/api/Auth/sign-up', {
          username,
          password,
          confirmPassword,
        });
        if (response.data.error) {
          setError(response.data.error.message);
          console.error(`[Register] Erro no registro do usuário: ${username}, Erro: ${response.data.error.message}`); // Log de erro no registro
        } else {
          console.log(`[Register] Usuário registrado com sucesso: ${username}`); // Log de sucesso
        }
      } catch (error) {
        setError('Erro ao registrar o usuário.');
        console.error(`[Register] Erro ao registrar o usuário: ${username}, Erro: ${error}`); // Log de erro no registro
      }
    };
  
    return (
      <div className="container mt-4">
        <h3>Registro</h3>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={handleRegister}>
          Registrar
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    );
  };
  
export default Register;