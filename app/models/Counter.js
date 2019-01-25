let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  Ips:[String],
  counter: 0
});

let Counter = mongoose.model('Counter', schema);
module.exports = Counter;