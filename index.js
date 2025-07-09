import express from 'express';
import client from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/alunos', async (req, res) => {
  const { nome, curso } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO alunos (nome, curso) VALUES ($1, $2) RETURNING *',
      [nome, curso]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar aluno' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
