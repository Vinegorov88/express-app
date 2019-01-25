
//Render contactUs page
module.exports.contactUs = function(req, res){
    return res.render('pages/contactUs');
}

//Change language && redirect to homepage
module.exports.changeLang = function(req, res){
    req.session.lang = req.params.lang;
    return res.redirect('/');
}
