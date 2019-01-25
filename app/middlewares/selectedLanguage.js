module.exports = function(req, res, next) {
    if(!req.session.lang) req.session.lang = "bg";
    req.lang = require('../lang/'+ req.session.lang);
    next();
}