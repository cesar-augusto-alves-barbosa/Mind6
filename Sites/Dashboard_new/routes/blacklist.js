var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var BlackList = require('../models').BlackList;
var escolaBlackList = require('../models').BlackList;
var computadorBlackList = require('../models').computadorBlackList;


router.post('/recuperar_processos/:fkEscola', function (req, res, next) {
    console.log(`Recuperando processos na blacklist da escola ${req.params.fkEscola}`);
    let instrucaoSql = `select b.idBlacklist, b.nomeProcesso from Blacklist b, Escola e, Escola_has_Blacklist eb where e.idEscola = ${req.params.fkEscola} and e.idEscola = eb.fkEscola and 
    eb.fkBlacklist = b.idBlacklist ;`;

    sequelize.query(instrucaoSql, {
        model: BlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/recuperar_processos_computador/:fkComputador', function (req, res, next) {
    console.log(`Recuperando processos na blacklist do computador ${req.params.fkComputador}`);
    let instrucaoSql = `select b.idBlacklist, b.nomeProcesso from Blacklist b, Computador c, Computador_has_Blacklist cb where c.idComputador = ${req.params.fkComputador} and c.idComputador = cb.fkComputador 
    and cb.fkBlacklist = b.idBlacklist ;`;

    sequelize.query(instrucaoSql, {
        model: BlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


router.post('/inserir_processo_blacklist/:processo', function (req, res, next) {
    console.log(`Inserindo processo ${req.params.processo} na blacklist `);
    let instrucaoSql = `insert Blacklist values('${req.params.processo}')`;
    sequelize.query(instrucaoSql, {
        model: BlackList
    }).then(resultado => {
        res.json(resultado)
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


router.get('/recuperar_blacklist', function (req, res, next) {
    console.log(`Recuperando processos da blacklist`);
    let instrucaoSql = `select * from Blacklist`;

    sequelize.query(instrucaoSql, {
        model: BlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/recuperar_blacklist_escola_especifica/:fkEscola/:fkProcesso', function (req, res, next) {
    console.log(`Recuperando blacklist da escola ${req.params.fkEscola}`);
    let instrucaoSql = `select eb.* from Escola e, Escola_has_Blacklist eb where e.idEscola = ${req.params.fkEscola} and e.idEscola = eb.fkEscola and eb.fkBlacklist = ${req.params.fkProcesso} ;`;

    sequelize.query(instrucaoSql, {
        model: escolaBlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.get('/recuperar_idBlackList/:processo', function (req, res, next) {
    console.log(`Recuperando id do processo ${req.params.processo} na blacklists `);
    let instrucaoSql = `select * from Blacklist where nomeProcesso = '${req.params.processo}'`;

    sequelize.query(instrucaoSql, {
        model: BlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/inserir_escola_has_blacklist/:fkEscola/:fkBlacklist', function (req, res, next) {
    console.log(`Inserindo processo bloqueado na escola ${req.params.fkEscola} na blacklist ${req.params.fkBlacklist}`);
    let instrucaoSql = `insert Escola_has_Blacklist values(${req.params.fkEscola}, '${req.params.fkBlacklist}');`;
    sequelize.query(instrucaoSql, {
        model: escolaBlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


router.post('/inserir_computador_has_blacklist/:fkComputador/:fkBlacklist', function (req, res, next) {
    console.log(`Inserindo processo bloqueado no computador ${req.params.fkComputador} na blacklist ${req.params.fkBlacklist}`);
    let instrucaoSql = `insert Computador_has_Blacklist values(${req.params.fkComputador}, '${req.params.fkBlacklist}');`;
    sequelize.query(instrucaoSql, {
        model: computadorBlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/deletar_processos_escola/:fkEscola/:fkBlackList', function (req, res, next) {
    console.log(`Deletando processo na blacklist da escola ${req.params.fkEscola}`);
    let instrucaoSql = `delete from Escola_has_Blacklist where fkBlacklist = ${req.params.fkBlackList} and fkEscola = ${req.params.fkEscola};`;

    sequelize.query(instrucaoSql, {
        model: escolaBlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/deletar_processos_computador/:fkComputador/:fkBlackList', function (req, res, next) {
    console.log(`Deletando processo na blacklist do Computador ${req.params.fkComputador}`);
    let instrucaoSql = `delete from Computador_has_Blacklist where fkBlacklist = ${req.params.fkBlackList} and fkComputador = ${req.params.fkComputador};`;

    sequelize.query(instrucaoSql, {
        model: computadorBlackList
    }).then(resultado => {
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;