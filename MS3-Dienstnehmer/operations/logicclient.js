/**
 * Logic for Client
 * Analysing Stock Market wisdoms selected by User
 * Analysing Market selected by User
 * Risk risk tolerance
 *
 */

const axios = require('axios');
const _user = require("./user.json");
const _watchlist = require("./watchlist.json");

//wei1  //The trend is your friend
//wei2  // Sell in May and Go Away, But remember to come back in September.
//wei3  // Don’t try to catch a falling knife
//wei4  // Buy on bad news, sell on good news
//pre1  // safe player preference
//pre2  // gamer
//inter // Real Estate, Chemicals, Automobiles, Technology, Metals & Mining

module.exports = {
    Clog : function(userPref,userID) {
       // let wie = userPref.weis;

        // --- just for testing
        userID = 1;
        let wei2 = "on";
        let inter = 'Airlines';
        //
        console.log(_user.user[userID].wei3);
        console.log("user Nickname:"+ _user.user[userID].Nickname);
        console.log("watchlist:" + _user.user[userID].walist);
        let wlist = _user.user[userID].walist;
        console.log("Share from the watchlist:" + (_watchlist.watchlist[wlist][0].watching));
            let jasonUrl = (_watchlist.watchlist[wlist][0].watching);

        // if Safe player get shares "marketCapitalization" > 500 mil // safe player preference
        axios.get(jasonUrl)
            .then(response => {
                let data = response.data
                if(data.marketCapitalization > 500){ console.log("pre1: safe company "); }
            })
            .catch(error => {
                console.log("------------- error". error);
            });

       // if gamer get smalcaps "marketCapitalization" < 50 mil // gamer
        axios.get(jasonUrl)
            .then(response => {
                let data = response.data
                if(data.marketCapitalization < 50){ console.log(" pre2: chance to earn Big and loos Big"); }
            })
            .catch(error => {
                console.log("------------- error". error);
            });

        // if wei1 true/on and qoute dif between pc(Schlusskurs) < o(Eröffnungskurs) buy signal else sell
        axios.get(jasonUrl +'/quote')
            .then(response => {
                let data = response.data
                console.log(data);
                if(data.o > data.pc  ){ console.log("weil1: sell")}
                else {console.log("weil1:buy"); }

            })
            .catch(error => {
                console.log("------------- error". error);
            });

            // if wei2 Timestamp // Sell in May and Go Away, But remember to come back in September.
        if(wei2) {
            let datetime = new Date(); // mount 0-11 may = 4 sep=8!
            if (datetime.getMonth() === 4) {
                console.log("wei2 : sell");

            }
            if(datetime.getMonth() === 8 ){ console.log("wei2 : buy");}
        }

        // if wei3 qoute dif between pc(Schlusskurs) - o(Eröffnungskurs) = < 0 dont buy //fehlender bezug langzeit trend nicht abgebildet
        axios.get(jasonUrl +'/quote')
            .then(response => {
                let data = response.data
                if(data.o > data.pc  ){ console.log("weil3: dont buy")}
            })
            .catch(error => {
                console.log("------------- error". error);
            });


        // If wei4 if news-rating is green sell signal
        axios.get(jasonUrl)
            .then(response => {
                // find news rating resource
                let nrUrl = response.data['news-rating'];
                axios.get(nrUrl)
                    .then(response => {
                        // find signal in news rating source
                        let data = response.data.rating;
                        let colourOfsignal = data[data.length-1].signal;
                        if(colourOfsignal == 'red'){ console.log("wei4 : buy");}
                        if(colourOfsignal == 'green'){console.log("wei4 : sell");}
                        console.log();
                    })
                    .catch(error => {
                        console.log("------------- error". error);
                    });

            })
            .catch(error => {
                console.log("------------- error". error);
            });
        // if interesone selected recommend shares "finnhubIndustry": "options"  view related News

        axios.get(jasonUrl)
            .then(response => {
                let data = response.data
                //if(data.o > data.pc  )
                console.log(data.finnhubIndustry);
                if(data.finnhubIndustry === inter){ console.log("matching your interest:" + inter  );}
            })
            .catch(error => {
                console.log("------------- error". error);
            });




       // return json;
    }


}
