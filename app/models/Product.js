let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  image: String,
  info: String,
  price: Number,
  quantity: Number,
  wholesalePrice: Number,
  retailPrice: Number,
  discount: Number,
  finalamount: Number
});

let Product = mongoose.model('Product', schema);
module.exports = Product;