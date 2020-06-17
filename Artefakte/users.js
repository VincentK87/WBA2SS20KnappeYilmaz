const express = require('express');
const json = require("qs");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const https = require('https');
const conf = require('./config');

let obj, jsonFile, pEmail,pName,pass;
let FILE_NAME = ('./operations/userDB.json');

//GET
router.get("/", function (req, res, next) {
    res.render('users')
});

//POST
router.post("/user", function (req, res, next) {

    //Speichern der uebergebenen Werte in Variablen.
        pEmail = req.body.email;
        pName = req.body.nickName;
        pass = req.body.password;

    /*  Hinzufuegen der Daten in ein JSON-File
        Lesen der JSON-Datei */

    fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let userID = Math.random().toString(36).substr(2, 9);//generiert eine ID
                obj = JSON.parse(data);//von JSON zum Objekt umgewandelt
                obj.user.push({[pName]: [{id: userID, email: pEmail, pass: pass}]});//Daten werden dem Objekt hinzugefuegt.
                jsonFile = JSON.stringify(obj, null, 2); //Von Objekt zu JSON gewandelt.
                fs.writeFile(FILE_NAME, jsonFile, (err) => {
                    if (err) {
                        console.log('Async Write: NOT successful!');
                        console.log(err);
                    } else {
                        console.log('Async Write: successful!');
                    }
                });//Schreiben der Daten in die JSON-Datei abgeschlossen.
            }
        }
    )
    res.end();
});

//DELETE
router.delete("/user/:name",function (req, res, next) {
    //Speichern der uebergebenen Werte in Variablen.
    pName = "1234";

    /* Lesen der JSON-Datei*/
    fs.readFile(FILE_NAME, function (err,data){
        if (err){
            console.log(err);
        }else{
            //Durchsuchen der userDB nach einem entsprechenden Eintrag.
            obj = JSON.parse(data);//von JSON zum Objekt umgewandelt
            console.log(Object.values(obj));
            delete obj.user;
            console.log(Object.values(obj));

        }
    });
    res.end();
});
module.exports = router;