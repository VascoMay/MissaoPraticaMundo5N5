const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Habilita o CORS
app.use(cors());

// Rota de boas-vindas (opcional)
app.get('/', (req, res) => {
  res.send('API está funcionando! Use /confidential-data com token.');
});

// Rota protegida
app.get('/confidential-data', (req, res) => {
  const token = req.query.token; // <- pega da URL, ex: ?token=123456abc

  if (token === '123456abc') {
    const jsonData = { dados: 'Informação secreta liberada com sucesso!' };
    res.json(jsonData);
  } else {
    res.status(401).json({ mensagem: 'Acesso não autorizado' });
  }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
