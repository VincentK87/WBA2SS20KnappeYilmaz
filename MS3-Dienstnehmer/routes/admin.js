const express = require('express');
const router = express.Router();
const fs = require('fs');
const conf = require('./config');

let obj = require("../operations/logicbibnews.json");
let objOrigin = require("../operations/logicbibnewsorigin.json");

const  FILE_NAME = './operations/logicbibnews.json';
const  FILE_NAME_Ori = './operations/logicbibnewsorigin.json';

/* /admin  */

/*
* just show logicbibnews entry
* */
router.get('/news', function(req, res, next) {
    fs.readFile('./operations/logicbibnews.json', (err, data) => {
        if (err) res.json({"massage" : 'Error missing file'});
        let obj_main = JSON.parse(data);
        res.json(obj_main);
    });
});

/*
* Patch the file logicbibnews to origin
 */

router.patch('/news', function(req, res, next){

    const writeFileAsync = (objOrigin)=> {
    const strData = JSON.stringify(objOrigin, null, 1);
    fs.writeFile(FILE_NAME, strData, err => {
        if (err) {
            console.log('Error writing file', err)
            res.json({"massage" : 'Error writing file',"status" : false})
        } else {
            console.log('Successfully wrote file')
            res.json({"massage" : 'Successfully wrote file : origin', "status" :'true'} )
        }
    });
    };
    writeFileAsync(objOrigin);
});

/*
* New data for the locigbibnews
* @param bn
* @param gn
* sending multiply params will be handled
* */

router.post('/news', function(req, res, next) {
    let getbn = req.query.bn //
    let getgn = req.query.gn //

    // check if Param bn = exist and has the type of object
    if (getbn && typeof(getbn)=== "object"){ console.log("typeof getbn:" + typeof(getbn));
       for (const i in getbn) { obj.badnews.push({bn: getbn[i] });}
    }
    // if it is a single string or number
    else if (getbn) {obj.badnews.push({bn: getbn }); }

    // the same as bn
    if (getgn && typeof(getgn)=== "object"){ console.log("typeof getgn:" + typeof(getgn));
        for (const i in getgn) { obj.goodnews.push({gn: getgn[i] });}
    }
    else if (getgn) {obj.goodnews.push({gn: getgn }); }
    console.log(obj.badnews);

    const writeFileAsync = (obj) => {
       const strData = JSON.stringify(obj, null, 1);

        fs.writeFile(FILE_NAME, strData, (error) => {
            if (error) {
                console.log('Async Write: NOT successful!');
                console.log("massage:"+error);
            } else {
                console.log('Async Write: successful!');
                console.log(obj);
            }
        });
    };

    writeFileAsync(obj);
res.json(obj);
});

router.delete('/news', function(req, res, next){
    let getbn_index = req.query.bn
    let getgn_index = req.query.gn
    console.log(getbn_index);
    console.log(getgn_index);
   // delete (obj.badnews[getbn_index]);
   // delete (obj.goodnews[getgn_index]);
    //var element = data[deleteKey];
    //delete element;
   obj.badnews.splice(getbn_index,1 );


    const writeFileAsync = (obj) => {
        const strData = JSON.stringify(obj, null, 1);

        fs.writeFile(FILE_NAME, strData, (error) => {
            if (error) {
                console.log('Async Write: NOT successful!');
                console.log("massage:"+error);
            } else {
                console.log('Async Write: successful!');
                console.log(obj);
            }
        });
    };
    writeFileAsync(obj);

res.json();
console.log(obj);
});


module.exports = router;