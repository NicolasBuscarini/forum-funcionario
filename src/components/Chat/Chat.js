// Chat.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'; // Adicione estilos específicos, se necessário

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (message) => {
    // Usando a função de atualização baseada no estado anterior
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (input.trim()) {
      addMessage(`Você: ${input}`);
      setInput('');
      // Simula uma resposta do chat sem substituir a mensagem enviada
      setTimeout(() => addMessage('Outro usuário: Esta é uma resposta automática.'), 1000);
    }
  };

  return (
    <div className="card card-fixed">
      <div className="card-header">
        <h5>Chat</h5>
      </div>
      <div className="card-body overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="alert alert-secondary p-2">
            {msg}
          </div>
        ))}
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
