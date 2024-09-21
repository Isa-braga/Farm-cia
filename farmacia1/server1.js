const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('client'));

let estoque = require('../data/estoque.json');

app.get('/estoque', (req, res) => {
    res.json(estoque);
});

app.post('/dispensar', (req, res) => {
    const { medicamento } = req.body;
    const produto = estoque.find(item => item.nome === medicamento);
    if (produto && produto.quantidade > 0) {
        produto.quantidade--;
        fs.writeFileSync('../data/estoque.json', JSON.stringify(estoque));
        res.json({ message: 'Medicamento dispensado com sucesso!' });
    } else {
        res.status(400).json({ message: 'Medicamento não disponível.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
