let User = require('../models/User');
let error404 = require('../services/error404');
let refreshSession = require('../services/refreshSession');

//Render user photos
module.exports.photos = function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
        if(err || !user) return error404(req, res);
        res.render('users/show', {user: user, section: 'photos'});
    });
}


//Sending messages on user
module.exports.messages = function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
      if(err || !user) return error404(req, res);
      User.find({messages: req.session.user._id}, function(err, messages){
        if(messages == req.session.user._id){
            res.render('users/messages', {user: user, messages: messages}); 
        }
      })
      res.render('users/messages', {user: user});
    });  
}


//Showing all users
module.exports.browse = function(req, res){
    User.find({}, function(err, users){
      if(err) return error404(req, res);
      res.render('users/browse', {users: users});
    });
}


//Show profile specific user
module.exports.show = function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
        if(err || !user) return error404(req, res);  
        res.render('users/show', {user: user, section: 'diary'});
    });
}


//Follow-up user
module.exports.followUser = function(req, res){
    if(!req.body.userId) return error404(req, res);

    User.findOne({_id: req.session.user._id}, function(err, user){
        if(err || !user) return error404(req, res);

        let followId = req.body.userId;
        let index = user.followedUsers.indexOf(followId);
        
        if (index > -1) user.followedUsers.splice(index, 1)
        else user.followedUsers.push(followId);  

        req.session.user = user;
        
        user.save(function(err){
            if(err) return error404(req, res);    
            res.redirect('back');
        }); 
    });
}


//Banning a user from the Administrator
module.exports.banUser = function(req, res){
    if (req.session.user.username != 'vladko886') return error404(req, res);
    if(!req.body.userId) return error404(req, res);

    User.findOne({_id: req.body.userId}, function(err, user){
        if(err || !user) return error404(req, res);

        user.active = (user.active == 1) ? 0 : 1;

        user.save(function(err){
            if(err) return error404(req, res); 
            refreshSession.add(req.body.userId);
            res.redirect('back');
        });
    }); 
}


//Block user
module.exports.blockUser = function(req, res){
    if(!req.body.userId) return error404(req, res);

    User.findOne({_id: req.session.user._id}, function(err, user){
        if(err || !user) return error404(req, res);

        let blockedId = req.body.userId;
        let blockedIndex = user.friends.indexOf(blockedId);
        if(blockedIndex > -1) user.friends.splice(blockedIndex, 1);
        
        blockedIndex = user.blockedUsers.indexOf(blockedId);
        if (blockedIndex == -1) user.blockedUsers.push(blockedId);

        user.save(function(err){
            if(err) return error404(req, res);

            req.session.user = user;

            User.findOne({_id: req.body.userId}, function(err, blocked){
                if (!err && blocked) {

                    let loggedInId = req.session.user._id.toString();
                    let loggedInIndex = blocked.friends.indexOf(loggedInId);
                    if (loggedInIndex > -1) blocked.friends.splice(loggedInIndex, 1);

                    blocked.save(function(err){
                        if(err) return error404(req, res); 
                    });
                }
                return res.redirect('/users/browse');
            });
        });
    }); 
}


//Unblock user
module.exports.unblockUser = function(req, res){
    if(!req.body.userId) return error404(req, res);

    User.findOne({_id: req.session.user._id}, function(err, user){
        if(err || !user) return error404(req, res);

        let blockedId = req.body.userId;

        let blockedIndex = user.blockedUsers.indexOf(blockedId);
        if (blockedIndex > -1) user.blockedUsers.splice(blockedIndex, 1);

        user.save(function(err){
            if(err) return error404(req, res);

            req.session.user = user;
            return res.redirect('/users/browse');
        });
    }); 
}