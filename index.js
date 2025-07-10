const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota para página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para cadastrar aluno
app.post('/cadastro', async (req, res) => {
  const { nome, curso } = req.body;

  try {
    await db.query('INSERT INTO alunos (nome, curso) VALUES ($1, $2)', [nome, curso]);
    res.send('<h2>Cadastro realizado com sucesso! <a href="/">Voltar</a></h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao cadastrar aluno. <a href="/">Tentar novamente</a></h2>');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
