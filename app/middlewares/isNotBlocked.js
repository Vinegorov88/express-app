let User = require('../models/User');

module.exports = function(req, res, next){
    if(typeof req.session.user != 'undefined'){
        User.findOne({username: req.params.username}, function(err, user){
            if(!err && user){
                if (req.session.user.blockedUsers.includes(user._id.toString())) {
                    res.render('profile/msgblock');
                }
                else if (user.blockedUsers.includes(req.session.user._id.toString())){
                    res.render('users/blocked');
                }
            }  
        });
    }
    next();
}