import React from 'react';
import './BirthdayBoard.css'; // Importando o arquivo de estilo

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
      <div className="birthday-container">
        {/* Exibindo a data do dia corrente em letras grandes e tons de laranja */}
        <h2 className="birthday-title">Aniversariantes de {currentMonth}</h2>
        <ul className="birthday-list">
          {birthdays.map((birthday, index) => (
            <li key={index} className="birthday-item">
              {birthday.day} - {birthday.name}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default BirthdayBoard;
