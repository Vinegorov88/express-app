const axios = require('axios');
const error404 = require('../services/error404');
const moment = require('moment');
const Currency = require('../models/Currency');


function getPrice(){
  axios({
    method:'get',
    url:'https://api.exchangeratesapi.io/latest?base=USD', 
  }).then(function(response) {
 
    const quoteBGN = response.data.rates.BGN.toFixed(4);
    const quoteGBP = response.data.rates.GBP.toFixed(4);    
    const date = response.data.date;

    Currency.findOne({ base: 'USD', quote: 'BGN' }, function(err, currency){
      if(err) return error404(req, res);
      currency.last = quoteBGN, currency.date = date, currency.lastRec = moment().format('HH:mm:ss');
      currency.save();
    });

    Currency.findOne({ base: 'USD', quote: 'GBP' }, function(err, currency){
      if(err) return error404(req, res);
      currency.last = quoteGBP, currency.date = date, currency.lastRec = moment().format('HH:mm:ss');
      currency.save();
    }); 
  });
}
setInterval(getPrice, 10000);




function returnBtcToUsd(){
  axios({
    method:'get',
    url:'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', 
  }).then(function(response) {

    const last = response.data['last'].toFixed(2);
    const high = response.data['high'].toFixed(2);
    const average = response.data['averages']['day'];
    const low = response.data['low'].toFixed(2);
    
    Currency.findOne({base: 'BTC', quote: 'USD'}, function(err, currency){
      if(err) return error404(req, res);
        currency.last = last, currency.high = high, currency.average = average, currency.low = low, currency.lastRec = moment().format('HH:mm:ss');    
      currency.save();     
    });
  });
}
setInterval(returnBtcToUsd, 4000);




module.exports.btcToUsdLast = function(req, res){
  Currency.findOne({base: "BTC", quote: "USD"}, function(err, currency){
    if(err) return error404(req, res);
    res.send("$" + currency.last);
  });
}



module.exports.btcToUsdHigh = function(req, res){
  Currency.findOne({base: "BTC", quote: "USD"}, function(err, currency){
    if(err) return error404(req, res);
    res.send("$" + currency.high);
  });
}



module.exports.btcToUsdAverage = function(req, res){
  Currency.findOne({base: "BTC", quote: "USD"}, function(err, currency){
    if(err) return error404(req, res);
    res.send("$" + currency.average);
  });
}



module.exports.btcToUsdLow = function(req, res){
  Currency.findOne({base: "BTC", quote: "USD"}, function(err, currency){
    if(err) return error404(req, res);
    res.send("$" + currency.low);
  });
}
