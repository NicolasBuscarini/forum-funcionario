import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { apiBaseUrl } from '../../../config';
import { FaUser, FaLock } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; 
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';

const Register = ({ username }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (!validatePassword(password)) {
            setError('A senha deve ter pelo menos 5 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
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
            } else {
                navigate('/'); 
            }
        } catch (error) {
            setError('Erro ao registrar o usuário.');
        }
    };

    return (
        <div className="register-container">
            <h1 className="title">Registro</h1>

            <CustomInput
                type="text"
                icon={<FaUser />} 
                placeholder="Digite seu nome"
                value={username}
                readOnly 
            />

            <CustomInput
                isPassword={true} 
                icon={<FaLock />} 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />

            <CustomInput
                isPassword={true} 
                icon={<FaLock />} 
                placeholder="Confirme a senha"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />

            <CustomButton
                label="Registrar" 
                onClick={handleRegister} 
                className="mt-4" 
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Register;
