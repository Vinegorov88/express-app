let Product = require('../models/Product');
let error404 = require('../services/error404');

//Render cart view
module.exports.view = function(req, res){ 
  return res.render('cart/view');
}


//Adding products in cart
module.exports.add = function(req, res){
  let errors = {};

  Product.findOne({_id: req.params.productId}, function(err, product){
    if(err) return error404(req, res);

    if(typeof req.session.user != "undefined"){
      if(req.session.user.balance < 5){
        errors.insufficientAmount = req.lang["errors.cart.insufficientAmount"];
        req.session.flash.errors = errors;
        return res.redirect('back');
      }
    }

    product.quantity = parseInt(req.body.quantity);
    req.session.cart[product._id] = product;

    if (req.body.quantity < 10) {
      product.discount = 0;
    }
    else if(req.body.quantity >= 10){
      product.discount = parseFloat(((product.price - product.wholesalePrice) * product.quantity).toFixed(2));
      product.price = parseFloat((product.price / 1.1).toFixed(2)); 
    }
    product.finalamount += product.price * product.quantity;
    req.session.cart[req.params.productId].quantity == product.quantity;
    req.session.finalamount = product.finalamount;

    return res.redirect('/cart/view');
  });
}


//Adding of more products in cart
module.exports.update = function(req, res){
  req.session.cart[req.params.productId].finalamount = 0.00;
  req.session.cart[req.params.productId].quantity = parseInt(req.body.quantity);       

  if (typeof req.session.cart[req.params.productId] != 'undefined' && req.body.quantity >= 10){
    req.session.cart[req.params.productId].discount = 
    ((req.session.cart[req.params.productId].price - req.session.cart[req.params.productId].wholesalePrice) * 
    req.session.cart[req.params.productId].quantity).toFixed(2);      
    req.session.cart[req.params.productId].finalamount = 
    ((req.session.cart[req.params.productId].price * req.session.cart[req.params.productId].quantity) - 
    req.session.cart[req.params.productId].discount).toFixed(2);
    req.session.finalamount = req.session.cart[req.params.productId].finalamount;    
  }
  else {
    req.session.cart[req.params.productId].finalamount += 
    (req.session.cart[req.params.productId].price * req.session.cart[req.params.productId].quantity).toFixed(2);
    req.session.finalamount = req.session.cart[req.params.productId].finalamount;
  }
  return res.redirect('back');
}


//Render checkout && check on balance user, if user is logged
module.exports.checkout = function(req, res){
  let errors = {};

  if(typeof req.session.user != "undefined" && req.session.user.balance < req.session.finalamount){
    errors.finalamount = req.lang["errors.cart.finalamount"];
    req.session.flash.errors = errors;
    return res.redirect('/cart/view');
  }
  return res.render('cart/checkout');
}


//Delete on product
module.exports.delete = function(req, res){
  delete req.session.cart[req.params.productId];
  return res.redirect('back');
}