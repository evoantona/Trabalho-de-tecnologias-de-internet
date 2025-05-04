// Importa os módulos necessários
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const routes = require('./routes');

// Inicializa o aplicativo Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware para interpretar requisições JSON
app.use(express.json());

// Serve arquivos estáticos do diretório public
app.use(express.static(path.join(__dirname, '../public')));

// Usa rotas para requisições AJAX
app.use('/api', routes);

// Dados simulados de estoque
let stocks = [
    { product: 'Notebook', quantity: 10, price: 2500.00 },
    { product: 'Smartphone', quantity: 25, price: 1200.00 },
    { product: 'Tablet', quantity: 15, price: 800.00 }
];

// Manipula conexões WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Envia dados iniciais de estoque ao novo cliente
    socket.emit('stockUpdate', stocks);

    // Manipula mensagens de chat
    socket.on('chatMessage', (msg) => {
        // Transmite a mensagem a todos os clientes
        io.emit('chatMessage', `Usuário ${socket.id.slice(0, 4)}: ${msg}`);
    });

    // Manipula desconexão
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Simula atualizações de estoque a cada 10 segundos
setInterval(() => {
    stocks = stocks.map(stock => ({
        ...stock,
        quantity: stock.quantity + Math.floor(Math.random() * 5) - 2, // Mudança aleatória
        price: stock.price + (Math.random() * 10 - 5) // Mudança aleatória no preço
    }));
    io.emit('stockUpdate', stocks); // Transmite dados atualizados
}, 10000);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});