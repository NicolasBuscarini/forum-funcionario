import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../../config';
import { FaUser, FaLock } from 'react-icons/fa'; // Ícones de usuário e senha
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Arquivo CSS personalizado

const Register = ({ username }) => { 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async () => {
        console.log(`[Register] Tentando registrar usuário: ${username}`);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            console.warn(`[Register] As senhas não coincidem para o usuário: ${username}`);
            return;
        }

        if (!validatePassword(password)) {
            setError('A senha deve ter pelo menos 5 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            console.warn(`[Register] Senha não atende aos requisitos para o usuário: ${username}`);
            return;
        }

        try {
            const response = await axios.post(`http://${apiBaseUrl}:5011/api/Auth/sign-up`, {
                username,
                password,
                confirmPassword,
            });
            if (response.data.error) {
                setError(response.data.error.message);
                console.error(`[Register] Erro no registro do usuário: ${username}, Erro: ${response.data.error.message}`);
            } else {
                console.log(`[Register] Usuário registrado com sucesso: ${username}`);
            }
        } catch (error) {
            setError('Erro ao registrar o usuário.');
            console.error(`[Register] Erro ao registrar o usuário: ${username}, Erro: ${error}`);
        }
    };

    return (
        <div className="register-container">
            <h1 className="title">Registro</h1>

            <div className="form-group position-relative mt-4">
                <FaUser className="input-icon" /> {/* Ícone de usuário */}
                <input
                    type="text"
                    className="form-control custom-input pl-5"
                    value={username}
                    readOnly
                    placeholder="Digite seu nome"
                />
            </div>

            <div className="form-group position-relative mt-3">
                <FaLock className="input-icon" /> {/* Ícone de senha */}
                <input
                    type="password"
                    className="form-control custom-input pl-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
            </div>

            <div className="form-group position-relative mt-3">
                <FaLock className="input-icon" /> {/* Ícone de confirmação de senha */}
                <input
                    type="password"
                    className="form-control custom-input pl-5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a senha"
                />
            </div>

            <button className="btn btn-primary btn-block custom-btn mt-4" onClick={handleRegister}>
                Registrar
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Register;
