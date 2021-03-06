const axios = require('axios');
const error404 = require('../services/error404');
const moment = require('moment');
const Currency = require('../models/Currency');
const Guest = require('../models/Guest');
const Item = require('../models/Item');
const cheerio = require('cheerio');
const request = require('request');


function returnExchangeRates(){
  axios({
    method:'get',
    url:'https://api.exchangeratesapi.io/latest?base=USD', 
  }).then(function(response) {
 
    const quoteBGN = response.data.rates.BGN.toFixed(4);
    const quoteGBP = response.data.rates.GBP.toFixed(4);    
    const date = response.data.date;

    Currency.findOne({ base: 'USD', quote: 'BGN'}, function(err, currency){
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
//Функцията се извиква на всеки един час
setInterval(returnExchangeRates, 60 * 10000);




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
// setInterval(returnBtcToUsd, 5000);




module.exports.btcToUsd = function(req, res){
  Currency.findOne({base: "BTC", quote: "USD"}, function(err, currency){
    if(err) return error404(req, res);
    res.send({last: currency.last, high: currency.high, average: currency.average, low: currency.low});
  });
}



//Функция която връща html от --> http://www.slavishow.com
function returnGuestsOfSlaviShow(){

  //Използваме request библиотеката като подаваме желаният сайт
  request('https://www.slavishow.com/', (error, response, html) => {

    //Проверяваме дали съществува грешка
    if(error) return;

    //Зареждаме HTML-ла с cheerio библиотеката
    let $ = cheerio.load(html);

    //Взимаме часът в момента
    let hour = moment().format('HH:mm:ss');

    //Взимаме днешния ден от седмицата
    let day = moment().format('dddd');

    //Проверяваме дали днешния ден е различен от Петък, ако е различен приключваме
    if(day == 'Friday') return;

    //Взимаме всички гости за следващата седмица
    $('.right_column #category-list-4 .sidebar_list li').find('h4').each(function (i, item){



      let ss = $(this).text().split('г').shift();


      console.log(ss)

      //Взимаме датата на която ще гостува госта
      let date = $(this).text().split(" ").slice(0,3).toString().replace(/,/g, ' ');

      //Взимаме имената на госта
      let names = $(this).text().substr(17, $(this).text().length);

      //Правим нов запис в нашата база с датата, часът и имената
      let guest = new Guest( { date: date, hour: hour, guest: names } );

      // guest.save();   
    });
  });
}
// setInterval(returnGuestsOfSlaviShow, 5000);





//Взимаме вече записаните данни от базата с днешния гост за деня и ги изпращаме към съотвения рут
module.exports.guestSlaviShow = function(req, res){

  //Взимаме днешния ден от седмицата
  let day = moment().format('dddd')

  //Взимаме днешната дата
  let date = moment().locale('bg').format('DD MMMM YYYY');

  //Проверяваме днешният ден дали е Събота или Неделя
  if(day == 'Saturday' || day == "Sunday"){

    //Връщаме последният запис от базата госта за Понеделник
    Guest.findOne({}, null, {sort: {_id: -1}}, function(err, guest){

      //Правим проверка за грешка
      if(err) return;
  
      //Изпращаме взетите данни от нашата база към рута
      res.send({date: guest.date, guest: guest.guest});
    })
  }

  else {
    //Търсим по днешната дата госта в базата и го връщаме
    Guest.findOne({date: date}, function(err, guest){

      //Правим проверка за грешка
      if(err) return;
  
      //Изпращаме взетите данни от нашата база към рута
      res.send({date: guest.date, guest: guest.guest});
    })
  }
}






//Функция която връща html от подаден сайт и взима нужната информация в случая от --> http://wwww.pik.bg
function returnNews(){

  //Използваме request библиотеката като подаваме желания сайт
  request('https://pik.bg/', (error, response, html) => {

    //Проверяваме дали съществува грешка и дали statusCode == 200
    if(!error && response.statusCode == 200) {
    
      let date = moment().locale('bg').format('DD MMMM YYYY');
      let hour = moment().locale('bg').format('HH:mm:ss');
      
      //Зареждаме HTML-ла с cheerio библиотеката
      let $ = cheerio.load(html);
      
      //Взимаме нужния текст от HTML-ла като подаваме тага в който се намира
      let lastNews = $('.main-title-holder a').text();

       //Правим запис в нашата базата с взетата нужна информация
      Item.findOne({}, function(err, item){
        if(err) return error404(req, res);
        if(item.lastNews == lastNews) return;
        else {
          item.lastNews = lastNews, item.date = date, item.hour = hour;
          item.save();
        }    
      });
    }
  });
}
setInterval(returnNews, 60 * 1000);





//Взимаме последната записана новина от базата я изпращаме към съответния рут
module.exports.news = function(req, res){
  Item.findOne({}, function(err, item){
    if(err) return error404(req, res);

    //Проверяваме дали има записана новина в базата и ако има е изпращаме
    if(item.lastNews.length) res.send({news: item.lastNews});
  });
}