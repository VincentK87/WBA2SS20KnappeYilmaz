/**
 * Logic for Client
 * Analysing Stock Market wisdoms selected by User
 * Analysing Market selected by User
 * Risk risk tolerance
 *
 */
const axios = require('axios');
const _user = require("./user.json");

module.exports = {
    Clog : function(userObj,user) {
        let wie = userObj.weis;
        
        //@param wei1;  // The trend is your friend
        //@param wei2;  // Sell in May and Go Away, But remember to come back in September.
        //@Param wei3;  // Don’t try to catch a falling knife
        //@param wei4;  // Buy on bad news, sell on good news
        //@param pre1;  // safe player preference
        //@param pre2;  // gamer
        //@param inter; // Real Estate, Chemicals, Automobiles, Technology, Metals & Mining

       // if gamer get smalcaps "marketCapitalization" < 20 mil

        // if Safe player get shares "marketCapitalization" > 500 mil

        // if weil1 true/on and qoute dif between pc(Schlusskurs) - o(Eröffnungskurs) = > 0 buy signal else sell

        // if weil2 Timestamp

        // if weil3 qoute dif between pc(Schlusskurs) - o(Eröffnungskurs) = < 0 dont buy

        // If weil4 if news-rating is green buy signal

        // if one selected recommend shares "finnhubIndustry": "options"  view related News

        return json;
    }
}