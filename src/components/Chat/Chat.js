import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import './Chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiBaseUrl } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (!authData) {
      console.error('User is not authenticated');
      return;
    }

    // Establish WebSocket connection
    ws.current = new WebSocket(`ws://${apiBaseUrl}:8080`);

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      try {
        const isJson = event.data.startsWith('{') && event.data.endsWith('}');
        if (isJson) {
          const messageObj = JSON.parse(event.data);
          const formattedMessage = {
            name: messageObj.user.name,
            ip: messageObj.user.ip,
            message: messageObj.message,
            time: new Date().toLocaleTimeString()
          };
          setMessages((prevMessages) => [formattedMessage, ...prevMessages]); // Inverte a ordem das mensagens
        } else {
          setMessages((prevMessages) => [{ message: `Server: ${event.data}`, time: new Date().toLocaleTimeString() }, ...prevMessages]);
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
  }, [authData]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]); // Inverte a ordem das mensagens
  };

  const sendMessage = () => {
    if (input.trim() && authData) {
      const messageObj = {
        user: {
          name: authData.username,
          ip: authData.clientIp,
        },
        message: input,
      };

      const messageJson = JSON.stringify(messageObj);
      ws.current.send(messageJson);
      setInput(''); // Clear input field after sending
    } else {
      console.error('User information is missing or input is empty');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className={`card card-fixed d-flex flex-column`}>

        {/* Título do chat no topo */}
        <div className="card-header custom-card-header">
          <h5 className="card-title custom-card-title">Chat, interaja com seus colegas.</h5>
        </div>

        {/* Área de mensagens com rolagem */}
        <div className="card-body overflow-auto flex-grow-1 message-container order-1">
          {messages.map((msg, index) => (
            <div key={index} className={`alert ${msg.name === authData.username ? 'alert-primary' : 'alert-secondary'} p-2`}>
              <strong>{msg.name} ({msg.ip})</strong><br />
              <span>{msg.message}</span>
              <div className="text-end">
                <small>{msg.time}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Campo de envio de mensagens e imagens */}
        <div className="card-footer order-2">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
            />
            <button className="btn btn-primary custom-btn d-flex align-items-center justify-content-center" style={{ width: "100px" }} onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> 
              <span>Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
