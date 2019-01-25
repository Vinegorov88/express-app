module.exports = function(req, res, next){
    req.flash = req.session.flash;
    req.session.flash = {}
    next();
}