const express = require('express');
let axios = require('axios');
const router = express.Router();
const fs = require('fs');
const conf = require('./config');
const uc = require('../controller/basiccontroller')
const cl = require('../operations/logicclient');
let  jsonFile, pEmail,pName,pass;
let obj = require("../operations/user.json");
let FILE_NAME = './operations/user.json';
cl.Clog();
//GET
router.get("/", function (req, res, next) {
  res.render('users');
});

//POST
router.post("/user", function (req, res, next) {

  pEmail =  req.body.email;   //req.body.email;
  pName = req.body.nickname;
  pass = req.body.password;

  let vpName = uc.validateUser(pName);// checking  nickname already exits
   if( vpName != null ) res.json("massage : user already exist"); res.end();
   //({ massage : "user already exist"});


  let wei1_r = req.body.wei1;  // The trend is your friend
  let wei2_r = req.body.wei2;  // Sell in May and Go Away, But remember to come back in September.
  let wei3_r = req.body.wei3;  // Don’t try to catch a falling knife
  let wei4_r = req.body.wei4;  // Buy on bad news, sell on good news
  let pre1_r = req.body.pre1;  // safe player preference
  let pre2_r = req.body.pre2;  // gamer
  let inter_r= req.body.inter; // Real Estate, Chemicals, Automobiles, Technology, Metals & Mining


  let userID = Math.random().toString(36).substr(2, 9);//generiert eine ID

  // user entry for the watchlist

  getwlist().then(data => {
   console.log("axios:" + data);
   let wlist = data;


  //-------------------
      obj.user.push({ Nickname: pName, id: userID, walist: wlist, email: pEmail, pass: pass, wei1: wei1_r, wei2: wei2_r, wei3: wei3_r, wei4: wei4_r, pre1: pre1_r, pre2: pre2_r, inter: inter_r });
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
  });
  res.end();
  });


//DELETE
router.delete("/user/:nickname",function (req, res, next) {
  //Speichern der uebergebenen Werte in Variablen.
  let pName = req.params.nickname;

    let vpName = uc.validateUser(pName);// checking  nickname already exits
    if( vpName == null ) { res.json({ "massage" : "user not existing" }); console.log(vpName); res.end()}
  /* Lesen der JSON-Datei*/
  //obj.splice(getbn_index,1 );
    else
    {
        let uArray = obj.user;

        console.log(vpName);
        let getIndex = uArray.findIndex( e => e.Nickname === vpName);
        if (getIndex) obj.user.splice(getIndex,1 );
        const writeFileAsync = (obj) => {
            const strData = JSON.stringify(obj, null, 1);

            fs.writeFile(FILE_NAME, strData, (error) => {
                if (error) {
                    console.log('Async Write: NOT successful!');
                    console.log("massage:" + error);
                } else {
                    console.log('Async Write: successful!');

                }
            });
        };
        writeFileAsync(obj);
        res.json({ massage: "your account is deleted" });
    }
});

function getwlist(){
  let url1 = 'http://localhost:3000/watchlists';
  return axios.post(url1).then(response => {
    return response.data
  });
}


module.exports = router;