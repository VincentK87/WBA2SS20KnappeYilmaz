const express = require('express');
const json = require("qs");
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const https = require('https');
const conf = require('./config');
let obj_w = require("../operations/watchlist.json");
let FILE_NAME_W = './operations/watchlist.json';
let  jsonFile, pEmail,pName,pass;
let obj = require("../operations/user.json");
let FILE_NAME = './operations/user.json';
//GET
router.get("/", function (req, res, next) {
  res.render('users')
});

//POST
router.post("/user", function (req, res, next) {

  pEmail =  req.body.email;   //req.body.email;
  pName = req.body.nickname;
  pass = req.body.password;


  let wei1_r = req.body.wei1;  // The trend is your friend
  let wei2_r = req.body.wei2;  // Sell in May and Go Away, But remember to come back in September.
  let wei3_r = req.body.wei3;  // Don’t try to catch a falling knife
  let wei4_r = req.body.wei4;  // Buy on bad news, sell on good news
  let pre1_r = req.body.pre1;  // safe player preference
  let pre2_r = req.body.pre2;  // gamer
  let inter_r= req.body.inter;      // Real Estate, Chemicals, Automobiles, Technology, Metals & Mining


  let userID = Math.random().toString(36).substr(2, 9);//generiert eine ID
  let wlist = userID;
  obj.user.push({[pName]: [{id: userID, watchlist_id: wlist, email: pEmail, pass: pass, wei1: wei1_r, wei2: wei2_r, wei3: wei3_r, wei4: wei4_r, pre1: pre1_r, pre2: pre2_r, inter: inter_r }]});
  //obj.user.push({[pName]: [{id: userID, email: pEmail, pass: pass}]});
    const writeFileAsync = (obj) => {
      const strData = JSON.stringify(obj, null, 1);

      fs.writeFile('./operations/user.json', strData, (error) => {
        if (error) {
          console.log('Async Write: NOT successful!');
          console.log("massage:"+error);
        } else {
          console.log('Async Write: successful!');
        }
      });
    };

    writeFileAsync(obj);
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
axios.get('http//localhost:3000/watchlists')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log("------------- error". error);
    });


module.exports = router;