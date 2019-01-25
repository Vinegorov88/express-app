let User = require('../models/User');
let error404 = require('../services/error404');
let refreshSession = require('../services/refreshSession');

//Render page banned user
module.exports.ban = function(req, res){
    res.render('profile/ban');
}

//Render page blocked user
module.exports.msgblock = function(req, res){
    res.render('profile/msgblock');
}

//Render profile page user
module.exports.show = function(req, res){
    res.render('profile/show', {section: 'diary'}); 
}

//Render photos page user
module.exports.photos = function(req, res){
    res.render('profile/show', {section: 'photos'});
}

//Render page more on logged user
module.exports.more = function(req, res){
    res.render('profile/show', {section: 'more'});
}

//Showing friend request
module.exports.invitations = function(req, res){  
    User.find({_id: req.session.user.friendRequest}, function(err, friendRequest){
        if(err) return error404(req, res);
        res.render('profile/show', {friendRequest: friendRequest, section: 'invitations'});
    }); 
}


//Showing friends on user
module.exports.friends = function(req, res){  
    User.find({_id: req.session.user.friends}, function(err, friends){
        if(err) return error404(req, res);
        res.render('profile/show', {friends: friends, section: 'friends'});
    });  
}


//Sending message to user
module.exports.sendMessage = function(req, res){
    if(!req.body.UserIDD || !req.body.message) return error404(req, res);
    
    User.findOne({_id: req.body.UserIDD}, function(err, user){
        if(err || !user) return error404(req, res);
        
        let username = req.session.user.username;
        let msg = req.body.message;

        let message = {[username]: msg};

        user.messages.push(message);

        user.save(function(err){
            if(err) return error404(req, res);
            res.redirect('back');
        });
    });
}


//Sending friend request to user
module.exports.sendFriendRequest = function(req, res){
    if(!req.body.UserID) return error404(req, res);
    
    User.findOne({_id: req.body.UserID}, function(err, user){
        if(err || !user) return error404(req, res);

        let id = req.session.user._id;

        let index = user.friendRequest.indexOf(id);
        
        if (index > -1) return res.redirect('back');
        else user.friendRequest.push(id);

        user.save(function(err){
            if(err) return error404(req, res);    
            res.redirect('back');
        }); 
    });
}


//Accept friend request on user
module.exports.acceptFriendRequest = function(req, res){
    if(!req.body.userId) return error404(req, res);

    User.findOne({_id: req.session.user._id}, function(err, user){
        if(err || !user) return error404(req, res);

        let userId = req.body.userId;

        let index = user.friendRequest.indexOf(userId);    
        if (index > -1) user.friendRequest.splice(index, 1);

        user.friends.push(userId);

        user.save(function(err){
            if(err) return error404(req, res);
            req.session.user = user;

            User.findOne({_id: userId}, function(err, sender){
                if (!err && sender) {
                    sender.friends.push(req.session.user._id);
                    sender.save(function(err){
                        if(err) return error404(req, res); 
                        refreshSession.add(userId);
                    });
                }
                return res.redirect('back');
            });
        }); 
    });
}


//Reject friend request on user
module.exports.rejectFriendRequest = function(req, res){
    if(!req.body.userID) return error404(req, res);
    
    User.findOne({_id: req.session.user._id}, function(err, user){
        if(err || !user) return error404(req, res);

        let id = req.body.userID;

        let index = user.friendRequest.indexOf(id);
        if (index > -1) user.friendRequest.splice(index, 1);

        req.session.user = user;
        
        user.save(function(err){
            if(err) return error404(req, res);    
            res.redirect('back');
        }); 
    });  
}