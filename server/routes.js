// Importa o roteador do Express
const express = require('express');
const router = express.Router();

// Rota POST para o formulário de contato
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    // Simula salvamento no banco de dados
    console.log('Dados recebidos:', { name, email, message });

    // Resposta de sucesso
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
});

module.exports = router;