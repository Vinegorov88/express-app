let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  name:  String,
  email: String,
  title: String,
  slug: String,
  text:  String,
  views: Number,
  date: String
});

let Article = mongoose.model('Article', schema);
module.exports = Article;
