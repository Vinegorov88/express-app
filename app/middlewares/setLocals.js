module.exports = function(req, res, next) {
    if (typeof req.session.cart == 'undefined') req.session.cart = {};
    res.locals.session = req.session;
    res.locals.flash = req.flash;
    res.locals.lang = req.lang;
    res.locals.req = req;
    next();
}