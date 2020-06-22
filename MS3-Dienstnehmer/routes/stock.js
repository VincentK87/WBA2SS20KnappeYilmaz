const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const conf = require('./config');



/* /shares list-element
*
* /shares?search={company} @param company-name
*
*  */

const headers = {'accept': 'application/json'}


router.get('/', function(req, res, next) {
    let search = req.query.search
    let re = new RegExp(search, 'i');
    axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=DE&token='+conf.stocktoken,headers)
         .then(response => {
            let data = response.data;
            let datas = [];
            if(search) {
                for (var myindex in data) {
                    let ergebnis = data[myindex].description.match(re);
                    if (ergebnis) {
                       // console.log(data[myindex]);
                        data[myindex]["company"] = conf.baseurl+"/shares/"+data[myindex].symbol;
                        datas.push(data[myindex]);
                    }
                }
             if (datas.length === 0) { res.status(404).json('Share not found');}
             else { res.status(200).json(datas);}
            }
            else{
              for(var myindex in data){
                data[myindex]["company"] = conf.baseurl+"/shares/"+data[myindex].symbol;
            }
            //console.log(data);
                res.status(200).json(data);}
        })
        .catch(error => {
            console.log("------------- error". error);
        });
});
/*  /:share @param symbol  */
router.get('/:share', function(req, res, next) {
    let symbol = req.params.share;
    let symbolurl= encodeURI(symbol);
    let url = 'https://finnhub.io/api/v1/stock/profile2?symbol='+symbolurl+'&token='+conf.stocktoken;
    axios.get(url)
         .then(response => {
            let data = response.data;
            let company = encodeURI(response.data.name);
            console.log(company);
            data["quote"] = conf.baseurl+'/shares/'+symbolurl+'/quote';
            data["news-rating"] = conf.baseurl+'/rating/'+company;
            data["tec-rating"] = conf.baseurl+'/rating/ta/'+symbolurl;
            data['news-journal'] = conf.baseurl+'/news/'+company;
            res.json(response.data);
         })
         .catch(error => {
            console.log("------------- error". error);
         });
});
/*shares/{symbol}/quote  @param symbol
* price Listing of a Share
*
*  */
router.get('/:share/quote', function(req, res, next) {

    let symbol = req.params.share;
    let symbolurl= encodeURI(symbol);
    let url = 'https://finnhub.io/api/v1/quote?symbol='+symbolurl+'&token='+conf.stocktoken;
    axios.get(url)
         .then(response => {
            let data = response.data
            data["company"] = conf.baseurl+'/shares/'+symbol;
            res.send(response.data);
         })
         .catch(error => {
            console.log("------------- error". error);
         });
});

module.exports = router;