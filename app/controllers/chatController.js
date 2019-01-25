let User = require('../models/User');
let Chat = require('../models/Chat');
let error404 = require('../services/error404');

//Render chatroom && show online users
module.exports.showOnlineUsers = function(req, res){
    if(typeof req.session.user != 'undefined'){
        User.find({}, function(err, users){
            if(!err && users){
                Chat.find({}, function(err, chats){
                    if(!err && chats){
                        return res.render('chat/chatroom', {users: users, chats: chats}); 
                    }
                });               
            }
        });
    }
}

//Sending message in chatroom
module.exports.sendMessage = function(req, res){
    let errors = {};

    if(typeof req.session.user != 'undefined'){
       if(!req.body.text) errors.text = req.lang["errors.cannotBeEmpty"];

       if(Object.keys(errors).length != 0){
           req.flash.errors = errors;
           return res.redirect('/chat/chatroom');
       }

       let newChat = new Chat({      
        username: req.session.user.username,
        message: req.body.text     
       });

       newChat.save(function (err){
        if(err) return error404(req, res);
        res.redirect('back');
       });
    }
}