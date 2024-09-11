const WebSocket = require('ws');

// Força o cliente a usar IPv4
const ws = new WebSocket('ws://127.0.0.1:8080');

ws.on('open', () => {
  console.log('Conectado ao servidor WebSocket');
  ws.send('Olá, servidor!');
});

ws.on('message', (data) => {
  console.log('Mensagem recebida do servidor:', data);
});

ws.on('close', () => {
  console.log('Conexão fechada');
});

ws.on('error', (error) => {
  console.error('Erro WebSocket:', error);
});
