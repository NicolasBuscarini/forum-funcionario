const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const amqp = require('amqplib');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let channel = null; // Define the channel variable globally
const clients = new Set(); // Store connected WebSocket clients

// Store messages temporarily if needed
const messageHistory = [];

// Conectar ao RabbitMQ
async function connectToRabbitMQ() {
    while (true) {
        try {
            console.log('Tentando conectar ao RabbitMQ...');
            const connection = await amqp.connect('amqp://rabbitmq'); // Nome do serviço RabbitMQ
            channel = await connection.createChannel(); // Assign channel to global variable
            await channel.assertQueue('chat-messages', { durable: true }); // Ensure the queue is durable

            console.log('Conectado ao RabbitMQ');

            // Fetch existing messages from the queue
            channel.consume('chat-messages', (msg) => {
                if (msg !== null) {
                    const message = msg.content.toString();
                    console.log(`Mensagem recebida da fila: ${message}`);
                    messageHistory.push(message); // Store in history
                    // Broadcast message to all WebSocket clients
                    clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(`Message from RabbitMQ: ${message}`);
                        }
                    });
                    channel.ack(msg); // Acknowledge the message as processed
                }
            }, { noAck: false }); // Set noAck to false to manually acknowledge messages

            return channel;
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ, tentando novamente em 5 segundos:', error);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de tentar novamente
        }
    }
}

connectToRabbitMQ();

// Quando um cliente se conecta
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    clients.add(ws); // Add the connected client to the set

    // Send stored messages to the new client
    messageHistory.forEach(message => {
        ws.send(`${message}`);
    });

    // Quando o servidor recebe uma mensagem
    ws.on('message', async (message) => {
        console.log(`Mensagem recebida do front: ${message}`);
        if (channel) {
            channel.sendToQueue('chat-messages', Buffer.from(message), { persistent: true });
        } else {
            ws.send('Erro ao enviar mensagem');
        }
    });

    // Quando a conexão é fechada
    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients.delete(ws); // Remove the disconnected client from the set
    });
});

// Inicia o servidor na porta 8080
server.listen(8080, () => {
    console.log('Servidor WebSocket ouvindo na porta 8080');
});
