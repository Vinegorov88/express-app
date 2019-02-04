module.exports = function error(req, res){
  let error = Error();
  error.status = 404;
  res.render('pages/404', { title: 'page not found', error: error });
}