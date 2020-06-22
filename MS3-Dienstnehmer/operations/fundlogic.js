/**
 * Logic for Rating technical analysis
 * values from rsi last index should be [9]
 * buy sell values from indicators
 */

// function for counting indicator
module.exports = {
    tan : function(rsi,indicators) {
        let json = {};
            json.rating = [];
        let ges;
        let ratingvalue = 0;
        // MACD, RMA, Moving Average ... als buy und sell Signale
        ratingvalue += indicators.buy;
        ratingvalue -= indicators.sell;
        rsiV = Number(rsi[9]);

        // RSI-Wert von über 70 überverkauft
        if (rsiV>70) { ratingvalue -= 1;console.log(ratingvalue);}
        //RSI-Wert unter 30 Kaufsignal
        else if(rsiV < 30){ ratingvalue += 1; }




        ges = ratingvalue;
        console.log(ges);
        if (ges>0){json.rating.push({tsignal:"green"});}
        else if(ges<0){json.rating.push({tsignal:"red"});}
        else if(ges===0){json.rating.push({tsignal:"yellow"});}

        return json;
    }
}