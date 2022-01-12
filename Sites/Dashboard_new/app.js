process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var blacklistRouter = require('./routes/blacklist');
var usuariosRouter = require('./routes/tecnico');
var computadorRouter = require('./routes/computador');
var componenteRouter = require('./routes/componente');
var usoTotalRouter = require('./routes/usoTotal');
var alertaRouter = require('./routes/alerta');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tecnico', usuariosRouter);
app.use('/computador', computadorRouter);
app.use('/usoTotal', usoTotalRouter);
app.use('/alerta', alertaRouter);
app.use('/blacklist', blacklistRouter);
app.use('/componente', componenteRouter);




module.exports = app;
