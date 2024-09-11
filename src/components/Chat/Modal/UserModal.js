import React, { useState, useEffect } from 'react';

const UserModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Função para obter o IP local usando WebRTC
      const fetchLocalIp = () => {
        const pc = new RTCPeerConnection({
          iceServers: []
        });

        pc.createDataChannel('');
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .catch(error => console.error('Erro ao criar oferta:', error));

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const ipMatch = event.candidate.candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
            if (ipMatch) {
              const localIp = ipMatch[1];
              setIp(localIp);
              console.log('IP local obtido:', localIp);
              pc.onicecandidate = null; // Evita múltiplos logs
            }
          }
        };
      };

      fetchLocalIp();
    }
  }, [isOpen]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (username.trim()) {
      // Cria o objeto do usuário com o IP
      const user = {
        name: username,
        ip: ip || 'IP não disponível'
      };
      console.log('Objeto usuário:', user); // Adiciona log para verificar o objeto usuário
      onClose(user);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Digite seu nome:</h2>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Seu nome"
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default UserModal;
