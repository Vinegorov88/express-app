let refreshSession = require('../services/refreshSession');
let logout = require('../services/auth/logout');
let error404 = require('../services/error404');
let User = require('../models/User');

module.exports = function(req, res, next) {
  if (typeof req.session.user != 'undefined') {
    if(refreshSession.has(req.session.user._id.toString())) {
      User.findOne({_id: req.session.user._id}, function(err, user) {
        if(!err && user) {
          refreshSession.remove(req.session.user._id.toString()); 
          if(user.active == 1){
            req.session.user = user;   
          } else {
            return logout(req, res, function(){
              res.redirect('/profile/ban');
            }, function(){
              return error404(req, res);
            });
          }      
        }
        else next();    
      });
    }
    else next();
  }
  else next();
}