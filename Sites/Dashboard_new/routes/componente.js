var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Componente = require('../models').Componente;


router.get('/recuperar/:fkComputador', function (req, res, next) {
    console.log(`Recuperando dados do computador ${req.params.fkComputador}`);
    let instrucaoSql = `select * from Componente where fkComputador=${req.params.fkComputador}`;

    sequelize.query(instrucaoSql, {
        model: Componente
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


module.exports = router;