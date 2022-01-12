var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var usoTotal = require('../models').usoTotal;


router.get('/recuperar/:idComputador/:tipoComponente', function (req, res, next) {
    console.log(`Recuperando uso da CPU`);
    let instrucaoSql = `select top 5 * from UsoTotal, Componente where Componente.tipoComponente='${req.params.tipoComponente}' and 
    Componente.fkComputador=${req.params.idComputador} and Componente.idComponente = UsoTotal.fkComponente order by idUsoAtual desc;`;
    sequelize.query(instrucaoSql, {
        model: usoTotal
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.get('/recuperar_todos_usos/:fkEscola', function (req, res, next) {
    console.log(`Recuperando uso da CPU`);
    let instrucaoSql = `select ut.usoComponente, cp.tipoComponente, cp.fkComputador from UsoTotal ut, Componente cp, Computador c where c.fkEscola = ${req.params.fkEscola} and c.idComputador = cp.fkComputador and cp.idComponente = ut.fkComponente order by idUsoAtual desc;`;
    sequelize.query(instrucaoSql, {
        model: usoTotal
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.get('/recuperar_media_computadores/:fkEscola/:tipoComponente', function (req, res, next) {
    console.log(`Recuperando média`);
    const hoje = new Date();
    const hojeSqll = `${hoje.getFullYear()} - ${hoje.getMonth() + 1} - ${hoje.getDate()}`;
    const ontemSql = `${hoje.getFullYear()} - ${hoje.getMonth() + 1} - ${hoje.getDate() - 1}`;
    const antesOntemSql = `${hoje.getFullYear()} - ${hoje.getMonth() + 1} - ${hoje.getDate() - 2}`;
    let instrucaoSql = `select(
        select AVG(ut.usoComponente) from Computador cp, Componente c, UsoTotal ut where cp.fkEscola = ${req.params.fkEscola} and cp.idComputador = c.fkComputador and 
        c.idComponente = ut.fkComponente and c.tipoComponente = '${req.params.tipoComponente}' and ut.dataHora BETWEEN '${antesOntemSql} 00:00:00' and '${antesOntemSql} 23:59:59'
    ) as antesOntem,
    (
        select AVG(ut.usoComponente) from Computador cp, Componente c, UsoTotal ut where cp.fkEscola = ${req.params.fkEscola} and cp.idComputador = c.fkComputador and 
        c.idComponente = ut.fkComponente and c.tipoComponente = '${req.params.tipoComponente}' and ut.dataHora BETWEEN '${ontemSql} 00:00:00' and '${ontemSql} 23:59:59'
    ) as ontem,
    (
        select AVG(ut.usoComponente) from Computador cp, Componente c, UsoTotal ut where cp.fkEscola = ${req.params.fkEscola} and cp.idComputador = c.fkComputador and 
        c.idComponente = ut.fkComponente and c.tipoComponente = '${req.params.tipoComponente}' and ut.dataHora BETWEEN '${hojeSqll} 00:00:00' and '${hojeSqll} 23:59:59'
    ) as atual`;

    sequelize.query(instrucaoSql, {
        model: usoTotal
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.get('/recuperar_media/:idComputador', function (req, res, next) {
    console.log(`Recuperando media`);
    let instrucaoSql = `select cp.nomeComputador, c.idComponente, c.tipoComponente, ut.usoComponente, ut.dataHora from Computador cp, Componente c, UsoTotal ut where cp.fkEscola = 2 and cp.idComputador = c.fkComputador and
    c.tipoComponente = 'CPU' and cp.idComputador = c.fkComputador and c.idComponente = ut.fkComponente order by ut.usoComponente desc ;`;

    sequelize.query(instrucaoSql, {
        model: usoTotal
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});



module.exports = router;