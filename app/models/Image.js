let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
  category: String,
  image: String,
  counterViews: 0
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;