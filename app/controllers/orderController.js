let User = require('../models/User');
let Order = require('../models/Order');
let error404 = require('../services/error404');


//Sending the order && and deducting the amount of user
module.exports.handleOrder = function(req, res){
    let errors = {};
 
    if(!req.body.name) errors.name = req.lang["errors.cannotBeEmpty"];
    if(!req.body.surname) errors.surname = req.lang["errors.cannotBeEmpty"];
    if(!req.body.fathersname) errors.fathersname = req.lang["errors.cannotBeEmpty"];
    if(!req.body.phone) errors.phone = req.lang["errors.cannotBeEmpty"];
    if(!req.body.town) errors.town = req.lang["errors.cannotBeEmpty"];
    if(!req.body.address) errors.address = req.lang["errors.cannotBeEmpty"];

    if(Object.keys(errors).length != 0) {
        req.flash.errors = errors;
        return res.redirect('/cart/checkout');
    }

    let date = new Date()

    let order = new Order({
        name: req.body.name,
        surname: req.body.surname,
        fathersname: req.body.fathersname,
        phone: req.body.phone,
        town: req.body.town,
        address: req.body.address,
        date: date.toLocaleString(),
        products: [],
        discount: 0,
        finalamount: 0      
    });

    for(let i in req.session.cart) {    
        let product = {product: req.session.cart[i].info, quantity: req.session.cart[i].quantity,
            discount: req.session.cart[i].discount, finalamount: req.session.cart[i].finalamount};
        order.products.push(product);
    }

    order.save(function(err){
        if(err) return error404(req, res);   
        User.findOne({username: req.session.user.username}, function(err, user){
            user.balance -= req.session.finalamount;
            user.save(function(err){
                if(err) return error404(req, res); 
                delete req.session.finalamount;
                delete req.session.cart;
                return res.redirect('/products/browse');
            });
        });   
    });
}