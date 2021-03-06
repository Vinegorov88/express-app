let theUsernameExists = require('../services/users/theUsernameExists');
let lastUsersOnline = require('../services/users/lastUsersOnline');
let error404 = require('../services/error404');
let login = require('../services/auth/login');
let logout = require('../services/auth/logout');
let User = require('../models/User');
let fs = require('fs');

//Render registration
module.exports.register = function(req, res){
  res.render('auth/register');
}


//Render login
module.exports.login = function(req, res){
  res.render('auth/login');
}


//User registration
module.exports.handleRegister = function(req, res){
  let errors = {};
  let success = {};
  let lastIntroduced = {};
  let freeUsername = {};

  User.findOne({username: req.body.username}, async function(err, user){
    
    if(!req.body.username) errors.username = req.lang["errors.cannotBeEmpty"];
    else lastIntroduced.username = req.body.username;
    
    if(user){    
      errors.username = req.lang["errors.register.usernameExists"];
  
      let username = await theUsernameExists(req.body.username);
      req.body.username = username;

      freeUsername.username = req.body.username;
      success.proposedUsername = req.lang["success.register.proposedUsername"];   
    } 
    
    else if(!user){
      success.username = req.lang["success.register.usernameAvailable"];
    }

    if(!req.body.password) errors.password = req.lang["errors.cannotBeEmpty"];
    else if(req.body.password.length < 6 || req.body.password.length > 20) errors.password = req.lang["errors.register.passwordTooShort"];

    if(!req.body.repeatPassword) errors.repeatPassword = req.lang['errors.cannotBeEmpty'];
    else if(req.body.password != req.body.repeatPassword) errors.repeatPassword = req.lang['errors.register.invalidPassword'];

    if(!req.body.name) errors.name = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.name = req.body.name;

    if(!req.body.surname) errors.surname = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.surname = req.body.surname;

    if(!req.body.egn) errors.egn = req.lang['errors.cannotBeEmpty'];
    else if(req.body.egn.length != 10) errors.egn = req.lang['errors.register.invalidEgn'];
    else lastIntroduced.egn = req.body.egn;

    if(!req.body.town) errors.town = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.town = req.body.town; 

    if(!req.body.street) errors.street = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.street = req.body.street; 

    if(!req.body.previousJob) errors.previousJob = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.previousJob = req.body.previousJob; 

    if(!req.body.worksAs) errors.worksAs = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.worksAs = req.body.worksAs; 

    if(Object.keys(errors).length != 0) {
      req.session.flash = {errors: errors, success: success, lastIntroduced: lastIntroduced, freeUsername: freeUsername};
      return res.redirect('/auth/register');
    }

    let image = req.files.image;
    let filePath = './public/uploads/images/' + image.name;

    image.mv(filePath, function(err){
      if(err) return error404(req, res);

      let date = new Date();

      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        fathersname: req.body.fathersname,
        egn: req.body.egn,
        town: req.body.town,
        street: req.body.street,
        previousJob: req.body.previousJob,
        worksAs: req.body.worksAs,
        friendRequest: [],
        friends: [],
        messages: [],
        image: image.name,
        photowall: image.name,
        followedUsers: [],
        comments: 0,
        active: 1,
        isOnline: 0,
        status: "",
        balance: 10,
        date: date.toLocaleString(),
        lastOnLine: date.toLocaleString()
      });

      newUser.save(function(err){
        if (err) {
          fs.unlink(filePath, function(err) {
            if (err) return error404(req, res);
            return res.redirect('/auth/register');
          });
        }
        return res.redirect('/auth/login');
      });
    });
    return username;
  });
}


//User login
module.exports.handleLogin = async function(req, res){ 
  let errors = {};
  let lastIntroduced = {};

  try {
    if(!req.body.username) errors.username = req.lang['errors.cannotBeEmpty'];
    else lastIntroduced.username = req.body.username;

    if(!req.body.password) errors.password = req.lang['errors.cannotBeEmpty'];
    let user;

    if(req.body.username && req.body.password) { 
      user = await User.findOne({username: req.body.username, password: req.body.password}); 
      if(!user) errors.username = req.lang['errors.login.failedLoggingIn'];
      else if(user.active == 0) errors.username = req.lang['errors.login.accountIsBanned'];
    }

    if(Object.keys(errors).length != 0) {
      req.session.flash = {errors: errors, lastIntroduced: lastIntroduced};
      return res.redirect('back');
    }
    await login(req, res, user);  
    res.redirect('/profile/show');
  }
  catch (e) {
    return error404(req, res);
  }
}


//User logout
module.exports.logout = function(req, res){
  User.findOne({_id: req.session.user._id}, function(err, user){
    if(!err && user){
      for (let userId in lastUsersOnline) {
        if (userId == req.session.user._id) {
          delete(lastUsersOnline[userId]);
        }
        logout(req, res, user, function(){
          res.redirect('/');
        }); 
      }
    } else {
      return error404(req, res);
    }
  });
}
