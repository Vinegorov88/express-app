module.exports = function logout(req, res, user, success){
 
    user.isOnline = '0';

    user.save(function(err){
        if(!err){    
            delete req.session.user;
            req.session.save(function() {
                success();
            });       
        }
    });     
}