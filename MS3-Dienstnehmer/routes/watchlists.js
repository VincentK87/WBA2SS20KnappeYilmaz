const express = require('express');
const router = express.Router();
const fs = require('fs');
const conf = require('./config');

let obj = require("../operations/watchlist.json");
let FILE_NAME = './operations/watchlist.json';


/* /watchlist  */

/*
* show watchlist entries/list
* */
router.get('/', function(req, res, next) {
    fs.readFile('./operations/watchlist.json', (err, data) => {
        if (err) res.json({"massage" : 'Error missing file'});
        let obj_main = JSON.parse(data);
        res.json(obj_main);
    });
});
/*
* show Specific watchlist
* @param watchlist.w*
 */
router.get('/:watchlist', function(req, res, next) {
    let getId = req.params.watchlist;
    console.log(getId);
    fs.readFile('./operations/watchlist.json', (err, data) => {
        if (err) res.json({"massage" : 'Error missing file'});
        let obj_main = JSON.parse(data);
            console.log(obj_main.watchlist[getId]);
            res.json(obj_main.watchlist[getId]);

    });
});

/*
* Main Post route
* Create watchtlist
* @Param w
 */
router.post('/', function(req, res, next) {

    let wleng = Object.keys(obj.watchlist).length +1;
    //console.log(wleng);
    let wArray = Object.keys(obj.watchlist);
        let newWlist = "w" + wleng;
        for (var i in wArray) {
            if (wArray[i] === newWlist ) { wleng++; newWlist = "w" + wleng;}
            else  {
                //console.log(newWlist);
                }
        }

      obj.watchlist[newWlist] = []  ;
    const writeFileAsync = (obj) => {
        const strData = JSON.stringify(obj, null, 1);

        fs.writeFile(FILE_NAME, strData, (error) => {
            if (error) {
                console.log('Async Write: NOT successful!');
                console.log("massage:"+error);
            } else {
                console.log('Async Write: successful!');
                res.json(newWlist);
            }
        });
    };
    writeFileAsync(obj);

});

    /*
    * New share entry for the watchlist
    * @param watchlist / w*
    * @param share /w*?url Query server
    * sending multiply params will not be handled
    * todo -checking if the Share url is valid
    *      -User control
    * */
router.post('/:w', function(req, res, next) {
    let getw = req.params.w;
    let getshare = req.query.share;
    // check if watchlist exist than push new share
    if(obj.watchlist[getw]) { obj.watchlist[getw].push({watching : getshare }); res.json(obj.watchlist[getw]);}
    else res.json("message: coudn't find watchlist "); res.end;

    const writeFileAsync = (obj) => {
        const strData = JSON.stringify(obj, null, 1);

        fs.writeFile(FILE_NAME, strData, (error) => {
            if (error) {
                console.log('Async Write: NOT successful!');
                console.log("massage:"+error);
            } else {
                console.log('Async Write: successful!');
            }
        });
    };

    writeFileAsync(obj);
});

router.delete('/:w', function(req, res, next){
    let getw_index = req.query.w
    if (getw_index) obj.watchlist[getw].splice(getw_index,1 );

    const writeFileAsync = (obj) => {
        const strData = JSON.stringify(obj, null, 1);

        fs.writeFile(FILE_NAME, strData, (error) => {
            if (error) {
                console.log('Async Write: NOT successful!');
                req.json("massage:"+error);
            } else {
                console.log('Async Delete: successful!');
                req.json(obj);
            }
        });
    };
    writeFileAsync(obj);
});


module.exports = router;