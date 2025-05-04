// Servidor Node.js com Express e Socket.io
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Rotas para requisições AJAX
app.use('/api', routes);

// Configuração do WebSocket para o chat
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  
  // Recebe e envia mensagens do chat
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); // Envia a mensagem para todos os clientes
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Inicia o servidor na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});