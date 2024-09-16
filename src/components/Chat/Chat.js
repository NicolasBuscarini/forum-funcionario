import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import './Chat.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null); // WebSocket reference

  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (!authData) {
      console.error('User is not authenticated');
      return;
    }

    // Establish WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080'); // Adjust the URL as necessary

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      // Handle incoming messages
      try {
        // Tenta verificar se a mensagem é JSON
        const isJson = event.data.startsWith('{') && event.data.endsWith('}');
        if (isJson) {
          const messageObj = JSON.parse(event.data);
          const formattedMessage = `${messageObj.user.name} (${messageObj.user.ip}): ${messageObj.message}`;
          console.log(`Received message from server: ${formattedMessage}`);
          setMessages((prevMessages) => [...prevMessages, `${formattedMessage}`]);
        } else {
          console.log(`Received non-JSON message: ${event.data}`);
          setMessages((prevMessages) => [...prevMessages, `Server: ${event.data}`]);
        }
      } catch (error) {
        console.error('Erro ao processar a mensagem recebida:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      addMessage(`Server: conexão com o chat cortada. Contate um administrador e tente novamente mais tarde`);
    };

    return () => {
      ws.current.close(); // Clean up WebSocket connection on component unmount
    };
  }, [authData]); // Dependência authData para reestabelecer a conexão WebSocket se necessário

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (input.trim() && authData) {
      const messageObj = {
        user: {
          name: authData.username,
          ip: "IP Desconhecido", // Substitua por lógica para obter o IP do usuário, se disponível
        },
        message: input,
      };
  
      const messageJson = JSON.stringify(messageObj);
      console.log(messageJson);
      ws.current.send(messageJson); // Send the JSON message through WebSocket
      setInput(''); // Clear input field after sending
    } else {
      console.error('User information is missing or input is empty');
    }
  };

  return (
    <div className="chat-container">
      <div
        style={{ height: '100%' }}
        className={`card card-fixed`}
      >
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
    </div>
  );
};

export default Chat;
