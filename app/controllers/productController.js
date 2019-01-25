let Product = require('../models/Product');
let error404 = require('../services/error404');

//Render products && showing available products
module.exports.browse = function(req, res){
  Product.find({}, function(err, products){
    if(err){
      return error404(req, res);
    }
    res.render('products/browse', {products: products}); 
  });
}
