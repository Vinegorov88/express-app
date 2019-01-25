let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  username: String,
  message: String
});

let Chat = mongoose.model('Chat', schema);
module.exports = Chat;