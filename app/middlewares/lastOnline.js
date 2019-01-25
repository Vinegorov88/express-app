let User = require('../models/User');
let moment = require('moment');

module.exports = function(req, res, next){
    if(typeof req.session.user != 'undefined'){
        User.findOne({_id: req.session.user._id }, function(err, user){       
            if(!err){        
                if(moment().diff(user.lastOnline, 'minutes') > 1){ 

                    user.isOnline = '0';
                    
                } else {

                    user.isOnline = '1';

                    user.lastOnline = moment().format('DD.MM.YYYY HH:mm:ss');
                }
                user.save();         
            }                   
        });         
    }
    next();
}