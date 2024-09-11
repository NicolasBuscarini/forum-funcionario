# Use a imagem base do Node.js
FROM node:18

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta em que o servidor WebSocket vai rodar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["node", "index.js"]
