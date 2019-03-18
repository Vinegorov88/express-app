let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  base: String,
  quote: String,
  last: String,
  high: String,
  average: String,
  low: String,
  date: String,
  lastRec: String
});

let Currency = mongoose.model('Currency', schema);
module.exports = Currency;