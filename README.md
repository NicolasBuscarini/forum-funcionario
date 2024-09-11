# Chat Application Architecture

## Descrição Geral
Este projeto implementa um sistema de chat em tempo real utilizando React no frontend, um backend com WebSocket e RabbitMQ para garantir escalabilidade e resiliência na comunicação de mensagens.

## Arquitetura

### Frontend (React):
- **Interface do Usuário:** Um componente de chat que permite aos usuários enviar e receber mensagens.
- **Conexão com Backend:** Utiliza **WebSockets** (ou **long polling**) para comunicação em tempo real.
- **Requisições ao Backend:** Chamadas HTTP para endpoints REST ou WebSockets para envio e recebimento de mensagens.

### Backend:
- **Servidor WebSocket/HTTP:** Responsável por receber as mensagens do frontend e enviá-las ao RabbitMQ.
- **Conector RabbitMQ:** Publica as mensagens na fila e consome mensagens da fila, enviando-as de volta para o frontend.

### RabbitMQ:
- **Fila de Mensagens:** Armazena as mensagens enviadas pelos usuários. Podem ser criadas filas diferentes para tipos variados de mensagens, como mensagens de chat e notificações de sistema.

### Persistência (Opcional):
- **Banco de Dados:** Caso necessário, as mensagens podem ser armazenadas para consultas futuras ou análise.

## Fluxo de Dados

### Envio de Mensagem:
1. O usuário digita uma mensagem no frontend.
2. O frontend envia a mensagem para o servidor via WebSocket .
3. O servidor recebe a mensagem e a publica na fila do RabbitMQ.
4. O RabbitMQ armazena a mensagem na fila.

### Recebimento de Mensagem:
1. O servidor consome as mensagens da fila no RabbitMQ.
2. O servidor envia as mensagens consumidas para os usuários conectados via WebSocket.
3. O frontend exibe as mensagens recebidas no chat.

## Considerações

### Escalabilidade:
RabbitMQ permite escalonar o processamento de mensagens, lidando com grandes volumes de mensagens simultâneas.

### Resiliência:
RabbitMQ assegura que as mensagens não sejam perdidas e são entregues mesmo que o sistema tenha interrupções temporárias.

### Latência:
Utilizar **WebSockets** reduz a latência na comunicação em tempo real, garantindo uma experiência de chat eficiente.
