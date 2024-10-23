import React, { useState } from 'react';
import { FaEyeSlash, FaEye, FaLock, FaUser } from 'react-icons/fa'; // Ícones
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomInput = ({ 
  type = 'text', // Tipo padrão é "text", mas pode ser "password"
  placeholder,
  value,
  onChange,
  icon, // Ícone opcional
  isPassword = false, // Define se o campo é de senha
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group position-relative w-100 mt-1">
      {icon && <span className="input-icon">{icon}</span>} {/* Exibe ícone, se passado */}
      
      <input
        type={isPassword && showPassword ? "text" : isPassword ? "password" : type} // Alterna entre texto e senha
        className={`form-control custom-input ${icon ? 'pl-5' : ''} ${className}`} // Ajusta padding se houver ícone
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />

      {isPassword && (
        <span
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Alterna ícone de senha */}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
