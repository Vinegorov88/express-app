let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  name:  String,
  surname: String,
  fathersname: String,
  phone: String,
  town:  String,
  address: String,
  date: String,
  products:[{}],
  discount: Number,
  finalamount: Number
});

let Order = mongoose.model('Order', schema);
module.exports = Order;