/**
 * Logic for Rating News
 * bib Search of Keywords in the news
 */
// external json word list for
const keywords = require("./logicbibnews");


//---------------------------
let badnews = keywords.badnews; // @param from keywords bn
let goodnews = keywords.goodnews;// @param from keywords gn
//------------------

// function for searching in news
module.exports = {
    zoltar: function(obj) {
        let json = {};
        let aussage = JSON.stringify(obj);
        json.rating = [];
        let positiv = 0;
        let negativ = 0;
        if (Object.keys(badnews).length) {
            for (var index = 0; index < Object.keys(badnews).length; ++index) {
                console.log("---" + badnews[index].bn);
                console.log(aussage.includes(badnews[index].bn));
                if (aussage.includes(badnews[index].bn)) {
                    json.rating.push({ negativ : badnews[index].bn});
                    negativ++;
                }
            }
        } else {
            console.log("sorry no Badword list or empty");
        }

        if (Object.keys(goodnews).length) {
            for (var index = 0; index < Object.keys(goodnews).length; ++index) {
                console.log("---" + goodnews[index].gn);
                console.log(aussage.includes(goodnews[index].gn));
                if (aussage.includes(goodnews[index].gn)) {
                    json.rating.push({ positiv : goodnews[index].gn});
                    positiv++;
                }
            }
        } else {
            console.log("sorry no goodword list or empty");
        }

        let ges = positiv-negativ;
        if (ges<0){json.rating.push({signal:"red"});}
        else if(ges>0){json.rating.push({signal:"green"});}
        else if(ges==0){json.rating.push({signal:"yellow"});}

        return json;
    }
}
