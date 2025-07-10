const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, curso } = req.body;
  try {
    await db.query('INSERT INTO alunos (nome, curso) VALUES ($1, $2)', [nome, curso]);
    res.send('Cadastro realizado com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir no banco:', err);
    res.status(500).send('Erro no cadastro.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


