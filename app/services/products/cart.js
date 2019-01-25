module.exports = function cart(req, res, product) {
    req.session.cart = product;
    req.session.save(function(err) {
        if(err) return reject(err);
    }); 
}