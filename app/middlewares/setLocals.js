module.exports = function(req, res, next) {
    if (typeof req.session.cart == 'undefined') req.session.cart = {};
    res.locals.session = req.session;
    res.locals.lang = req.lang;
    req.req = req;
    next();
}