// NavBar.js
import React from 'react';
import './NavBar.css'; // Crie esse arquivo CSS para estilizar o componente

const NavBar = () => {
  return (
    <nav>
      <a href="#rh">Recursos Humanos</a>
      <a href="#documentos">Documentos</a>
      <a href="#treinamentos">Treinamentos</a>
      <a href="#suporte">Suporte</a>
      <a href="#saude">Saúde e Bem-estar</a>
      <a href="#comunicacao">Comunicação Interna</a>
    </nav>
  );
};

export default NavBar;
