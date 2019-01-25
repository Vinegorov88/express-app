let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  fathersname: String,
  egn: String,
  town: String,
  street: String,
  previousJob: String,
  worksAs: String,
  image: String,
  photowall: String,
  followedUsers : [String],
  friendRequest: [],
  friends : [],
  blockedUsers: [],
  messages : [],
  comments: Number,
  active: Number,
  isOnline: Number,
  status: String,
  balance: Number,
  date: String,
  lastOnline: String
});

let User = mongoose.model('User', userSchema);
module.exports = User;
