let Counter = require('../models/Counter');
let Article = require('../models/Article');
let User = require('../models/User');
let error404 = require('../services/error404');
let ip = require('ip');

//Render homepage
module.exports.home = function(req, res){
  Counter.findOne({}, function(err, counter){
    if (err || !counter) return error404(req, res);  
    Article.find({}, null, {sort: {views: -1}}, function(err, articles){
      if (err) return error404(req, res);
      User.find({}, null, {sort: {comments: -1}}, function(err, users){
        if (err || !users) return error404(req, res);

        let IpAddress = ip.address();
    
        if(counter.Ips.indexOf(IpAddress) > -1){
          return res.render('home/home',{counter: counter, articles: articles, users: users});
        }

        counter.Ips.push(IpAddress);
        counter.counter++;
        
        counter.save(function(err){
          if(err) return error404(req, res);
          return res.render('home/home',{counter: counter, articles: articles, users: users});   
        }); 
      });
    });
  });
}

