// BirthdayBoard.js
import React from 'react';

const BirthdayBoard = () => {
  // Lista de aniversariantes (exemplo)
  const birthdays = [
    { day: 5, name: 'João Silva' },
    { day: 12, name: 'Maria Santos' },
    { day: 20, name: 'Carlos Souza' },
    { day: 25, name: 'Ana Pereira' },
  ];

  // Obtendo a data corrente
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Obtendo o mês atual para o título de aniversariantes
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div style={styles.container}>
      {/* Exibindo a data do dia corrente em letras grandes e tons de laranja */}
     
      <h2 style={styles.title}>Aniversariantes de {currentMonth}</h2>
      <ul style={styles.list}>
        {birthdays.map((birthday, index) => (
          <li key={index} style={styles.item}>
            {birthday.day} - {birthday.name}
          </li>
        ))}
      </ul>
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

export default BirthdayBoard;
