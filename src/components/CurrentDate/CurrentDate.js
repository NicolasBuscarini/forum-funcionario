// CurrentDate.js
import React from 'react';

const CurrentDate = () => {
  // Obtendo a data corrente
  const currentDate = new Date();
  const formattedDate = "Hoje é " + currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div style={styles.container}>
      <div style={styles.date}>{formattedDate}</div>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      border: '1px solid #FFA500', // Bordas em laranja
      borderRadius: '8px',
      backgroundColor: '#FFE4B5', // Fundo em tom claro de laranja
      color: '#D35400', // Texto em tom escuro de laranja
      textAlign: 'left',
      marginBottom: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    date: {
      fontSize: '24px', // Letras grandes
      color: '#FF8C00', // Cor laranja vibrante
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
    title: {
      marginBottom: '10px',
      color: '#FF4500', // Título em um tom mais vibrante de laranja
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    item: {
      padding: '8px 0',
      borderBottom: '1px solid #FFA500',
    },
  };
  

export default CurrentDate;
