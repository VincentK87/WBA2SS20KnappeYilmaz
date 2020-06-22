const express = require('express');
const router = express.Router();
const conf = require('./config');
const dt = require('../operations/newslogic')
const df = require('../operations/fundlogic')
const axios = require('axios');



router.get('/:company', function(req, res, next) {
    let company = req.params.company;
    let companyurl= encodeURI(company);
    let dataurl= 'https://newsapi.org/v2/everything?language=de&q='+companyurl+'&apiKey='+conf.newskey;
    axios.get(dataurl)
         .then(response => {
            let dataobj= response.data.articles;
            console.log(dataobj);
            let a = dt.zoltar(dataobj); // function in newslogic.js
            console.log(a);
            res.send(a);
        })
         .catch(error => {
            console.log("------------- error". error);
        });
});
router.get('/ta/:symbol', function(req, res, next) {
    let symbol = req.params.symbol;
    let rsivalue= 'https://finnhub.io/api/v1/indicator?symbol='+symbol+'&resolution=D&from=1583098857&to=1584308457&indicator=rsi&timeperiod=3&token='+conf.stocktoken;
    let indicators= 'https://finnhub.io/api/v1/scan/technical-indicator?symbol='+symbol+'&resolution=D&token='+conf.stocktoken;

    const rsivaluereg = axios.get(rsivalue);
    const indicatorsreg = axios.get(indicators);

    axios.all([rsivaluereg, indicatorsreg])
        .then( axios.spread((...responses) => {
            const rsi = responses[0];
            const indicators= responses[1];
            let rating = df.tan(rsi.data.rsi, indicators.data.technicalAnalysis.count);
            rating["company"] = conf.baseurl+"/shares/"+symbol;

            res.send(rating);
        }))
        .catch(error => {
            console.log("------------- error". error);
        });
});
module.exports = router;