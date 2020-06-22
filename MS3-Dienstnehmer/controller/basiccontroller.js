
const fs = require('fs');
let obj = require("../operations/user.json");
let FILE_NAME = '../operations/user.json';


module.exports = {
    regExForUser: "", // define regex for name validation
    regExForwatchlist: "", // define regex for validation

    validateUser: function(Pname){
        //if(Pname === "hans" ){ console.log("hans match");}
      let wArray = obj.user;
      /*wArray.forEach(
            element => { console.log(element.Nickname)
        if(Pname === element.Nickname){ console.log("match:"); return "match: "; }
        else return true;
        })*/
        var check = wArray.find(function(e) {
            return e.Nickname === Pname;
        });
        return check ? check.Nickname : null;
console.log(check)

    },

    validateIndex: function(getIndex){
        let wArray = obj.user;
        return ( wArray.findIndex( e => e.Nickname === getIndex));
    },

    findWatchlist: function(user){
        let wArray = obj.user;
        var check = wArray.find(function(e) {
            return e.Nickname === Pname;
        });
        return check ? check.Nickname : null;


    }
}