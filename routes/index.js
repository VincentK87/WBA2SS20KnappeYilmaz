var express = require('express');
var router = express.Router();
const conf = require('./config');
/* GET home page. */

router.get('/', function(req, res, next) {

  let a = JSON.stringify(req.headers.accept);
  console.log(a);
  if (req.accepts('html')) {
    res.render('index', { title: 'AA-App', baseurl: conf.baseurl});
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'try root '+conf.baseurl+'/shares' });
    return;
  }

});

module.exports = router;
