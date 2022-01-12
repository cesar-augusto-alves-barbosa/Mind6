var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login.html', { title: 'Express' });
  console.log('foi');
});

// app.get("/api", (req, seq))
module.exports = router;
