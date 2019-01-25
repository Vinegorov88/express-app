let User = require('../models/User');

module.exports = function error(req, res){
  let error = new Error();
  error.status = 404;
  res.render('errors/error404', { title: 'page not found', error: error });
}