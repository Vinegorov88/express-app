module.exports = function removeFromCart(req, res, success, error){
    delete req.session.cart;
    req.session.save(function(err) {
        if(err) error();
        else success();
    });
}