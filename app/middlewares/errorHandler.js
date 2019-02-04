module.exports = function(err, req, res, next){
  if(err){
    console.log(err) 
    return res.render('pages/404')
  }
  next();
}

  