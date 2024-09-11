import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; 
import UserModal from './Modal/UserModal';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null); // Store the user
  const [isModalOpen, setIsModalOpen] = useState(true);
  const ws = useRef(null); // WebSocket reference

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080'); // Adjust the URL as necessary

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      // Handle incoming messages
      const message = event.data;
      console.log(`Received message from server: ${message}`);
      setMessages((prevMessages) => [...prevMessages, `Server: ${message}`]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      addMessage(`Server: conexão com o chat cortada. Contate um administrador e tente novamente mais tarde`);
    };

    return () => {
      ws.current.close(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  const handleUserSubmit = (userData) => {
    setUser(userData);
    setIsModalOpen(false);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const message = `${user?.name || 'Desconhecido'}: ${input}`;
      console.log(message);
      ws.current.send(input); // Send the message through WebSocket
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <UserModal isOpen={isModalOpen} onClose={handleUserSubmit} />
      <div className={`card card-fixed ${isModalOpen ? 'disabled' : ''}`}>
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
              disabled={isModalOpen}
            />
            <button className="btn btn-primary" onClick={sendMessage} disabled={isModalOpen}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
