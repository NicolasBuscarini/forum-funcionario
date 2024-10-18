import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomButton = ({ label, onClick, className = '', ...props }) => {
  return (
    <button
      className={`btn btn-primary btn-block custom-btn ${className}`} // Permite personalizar a classe
      onClick={onClick}
      {...props} // Permite passar outras props, como `disabled`
    >
      {label}
    </button>
  );
};

export default CustomButton;
