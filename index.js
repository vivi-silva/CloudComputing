const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/cadastro', (req, res) => {
    const { nome, curso } = req.body;
    db.query('INSERT INTO alunos (nome, curso) VALUES ($1, $2)', [nome, curso], (err) => {
        if (err) {
            console.error(err);
            return res.send('Erro ao cadastrar');
        }
        res.send('Aluno cadastrado com sucesso!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));