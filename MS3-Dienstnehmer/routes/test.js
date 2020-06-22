const express = require('express');
const router = express.Router();
const axios = require('axios');
const conf = require('./config');



/* /news listen verzeichnis  */
router.get('/', function(req, res, next) {
// get top business headlines
    axios.get('https://wbaaapp.herokuapp.com/shares')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log("------------- error".error);
        });
});
    module.exports = router;