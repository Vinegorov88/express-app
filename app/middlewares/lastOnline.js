let lastUsersOnline = require('../services/users/lastUsersOnline');
let moment = require('moment');

module.exports = function(req, res, next){
    if(typeof req.session.user != 'undefined'){
        lastUsersOnline[req.session.user._id] = moment().unix();
    }
    next();
}