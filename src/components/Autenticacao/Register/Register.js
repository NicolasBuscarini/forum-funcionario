import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { apiBaseUrl } from '../../../config';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones de usuário, senha e olho
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Arquivo CSS personalizado
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';

const Register = ({ username }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidade da senha
    const navigate = useNavigate(); // Hook para navegação

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
                navigate('/'); // Redireciona para a página inicial de autenticação
            }
        } catch (error) {
            setError('Erro ao registrar o usuário.');
            console.error(`[Register] Erro ao registrar o usuário: ${username}, Erro: ${error}`);
        }
    };

    return (
        <div className="register-container">
            <h1 className="title">Registro</h1>

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
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <CustomInput
                isPassword={true} // Define que é um campo de senha
                icon={<FaLock />} // Ícone de senha
                placeholder="Confirme a senha"
                value={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <CustomButton
                label="Registrar" // Texto do botão
                onClick={handleRegister} // Função de clique
                className="mt-4" // Classe adicional
            />

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Register;
