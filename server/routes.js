// Rotas para requisições AJAX
const express = require('express');
const router = express.Router();

// Rota para processar o formulário de contato
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validação simples
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Simula processamento (ex.: salvar no banco de dados)
  console.log(`Mensagem recebida de ${name} (${email}): ${message}`);
  
  // Resposta de sucesso
  res.json({ success: 'Mensagem enviada com sucesso!' });
});

module.exports = router;