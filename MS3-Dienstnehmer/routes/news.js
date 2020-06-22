const express = require('express');
const router = express.Router();
const axios = require('axios');
const conf = require('./config');



/* /news listen verzeichnis  */
router.get('/', function(req, res, next) {
// get top business headlines
    axios.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey='+conf.newskey)
         .then(response => {
            res.send(response.data);
         })
         .catch(error => {
            console.log("------------- error". error);
         });

});
/* /news search just the top headlines @param company  */
router.get('/:company', function(req, res, next) {
    let company = req.params.company;
    let url = 'https://newsapi.org/v2/top-headlines?country=de&category=business&q='+company+'&apiKey='+conf.newskey;
    axios.get(url)
         .then(response => {
            res.send(response.data);
            console.log(company);
         })
         .catch(error => {
            console.log("------------- error". error);
         });
});
/* search in all news news/company/ @param company  no search key needed  */
router.get('/company/:id', function(req, res, next) {
    let cid = (req.params.id);
    let cidp= encodeURI(cid);
    let url = 'https://newsapi.org/v2/everything?language=de&q='+cidp+'&apiKey='+conf.newskey;
    axios.get(url)
         .then(response => {
            console.log(response.data);
            res.send(response.data);
         })
         .catch(error => {
            console.log("------------- error". error);
         });
});

module.exports = router;