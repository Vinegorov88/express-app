let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  articleId: String,
  author: String,
  comment: String,
  likeIps:[String]
});

let Comment = mongoose.model('Comment', schema);
module.exports = Comment;