var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var usoTotal = require('../models').usoTotal;


router.get('/recuperar/:idComputador/:tipoComponente', function (req, res, next) {
    console.log(`Recuperando uso do componente`);
    let instrucaoSql = `SELECT *
    FROM UsoTotal
    JOIN Componente ON Componente.idComponente = UsoTotal.fkComponente
    WHERE Componente.tipoComponente = '${req.params.tipoComponente}'
        AND Componente.fkComputador = ${req.params.idComputador}
    ORDER BY idUsoAtual DESC
    LIMIT 5;`;
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
    console.log(`Recuperando uso da CPU de todos os PCs da escola ${req.params.fkEscola}`);
    let instrucaoSql = `SELECT ut.usoComponente, cp.tipoComponente, cp.fkComputador
    FROM UsoTotal ut
    JOIN Componente cp ON ut.fkComponente = cp.idComponente
    JOIN Computador c ON cp.fkComputador = c.idComputador
    WHERE c.fkEscola = ${req.params.fkEscola}
    AND cp.tipoComponente = 'CPU'
    ORDER BY ut.idUsoAtual DESC;`;
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
    const hojeSqll = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;
    const ontemSql = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate() - 1}`;
    const antesOntemSql = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate() - 2}`;
    let instrucaoSql = `SELECT
    (SELECT AVG(ut.usoComponente)
     FROM Computador cp
     JOIN Componente c ON cp.idComputador = c.fkComputador
     JOIN UsoTotal ut ON c.idComponente = ut.fkComponente
     WHERE cp.fkEscola = ${req.params.fkEscola}
       AND c.tipoComponente = '${req.params.tipoComponente}'
       AND ut.dataHora BETWEEN '${antesOntemSql} 00:00:00' AND '${antesOntemSql} 23:59:59') as antesOntem,
    
    (SELECT AVG(ut.usoComponente)
     FROM Computador cp
     JOIN Componente c ON cp.idComputador = c.fkComputador
     JOIN UsoTotal ut ON c.idComponente = ut.fkComponente
     WHERE cp.fkEscola = ${req.params.fkEscola}
       AND c.tipoComponente = '${req.params.tipoComponente}'
       AND ut.dataHora BETWEEN '${ontemSql} 00:00:00' AND '${ontemSql} 23:59:59') as ontem,
    
    (SELECT AVG(ut.usoComponente)
     FROM Computador cp
     JOIN Componente c ON cp.idComputador = c.fkComputador
     JOIN UsoTotal ut ON c.idComponente = ut.fkComponente
     WHERE cp.fkEscola = ${req.params.fkEscola}
       AND c.tipoComponente = '${req.params.tipoComponente}'
       AND ut.dataHora BETWEEN '${hojeSqll} 00:00:00' AND '${hojeSqll} 23:59:59') as atual;`;

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
    let instrucaoSql = `SELECT cp.nomeComputador, c.idComponente, c.tipoComponente, ut.usoComponente, ut.dataHora
    FROM Computador cp
    JOIN Componente c ON cp.idComputador = c.fkComputador
    JOIN UsoTotal ut ON c.idComponente = ut.fkComponente
    WHERE cp.fkEscola = 2
      AND c.tipoComponente = 'CPU'
    ORDER BY ut.usoComponente DESC;`;

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