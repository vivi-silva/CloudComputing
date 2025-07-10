const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (formulário)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota de sucesso
app.get('/sucesso.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/sucesso.html'));
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, curso } = req.body;
  try {
    await db.query('INSERT INTO alunos (nome, curso) VALUES ($1, $2)', [nome, curso]);
    res.redirect('/sucesso.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar aluno');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

