let error404 = require('../services/error404');
let Article = require('../models/Article');
let Comment = require('../models/Comment');
let User = require('../models/User');
let slug = require('slug');
let ip = require('ip');

//Render publish articles
module.exports.publish = function(req, res){
  res.render('articles/publish');
}


//Getting the published articles
module.exports.browse = function(req, res){
  Article.find({}, function(err, articles){
    if (err) return errors404(req, res);
    res.render('articles/browse', {articles: articles});
  });
}


//Show on specific article && show comments
module.exports.show = function(req, res){
  Article.findOne({slug: req.params.slug, _id: req.params.IdAndSlug}, function(err, article){
    if(err || !article) return errors404(req, res);
    
    Comment.find({articleId: article._id}, function(err, comments){
      if (err) return errors404(req, res);
      article.views++;
      article.save(function(err){
        res.render('articles/show', {article: article, comments: comments});
      });
    });   
  });
}


//Likes on comment && increase оn likes
module.exports.likes = function(req, res){
  Comment.findOne({_id: req.params.commentId}, function(err, comment){
    if (err) return errors404(req, res);
    let ipAddress = ip.address();

    if(comment.likeIps.indexOf(ipAddress) > -1)
    return res.redirect('/articles/browse');

    comment.likeIps.push(ipAddress);
       
    comment.save(function (err){
      if(err) return errors404(req, res);
      res.redirect('/articles/show/' + comment.articleId);
    });
  });
}


//Delete on specific article
module.exports.delete = function(req, res){
  Article.findOneAndDelete({_id: req.params.articleId}, function(err){
    if (err) return errors404(req, res);
    return res.redirect('/articles/browse');
  });
}


//Publish on article
module.exports.handlePublish = function(req, res){
  let errors = {};

  if(!req.body.name) errors.name = req.lang["errors.cannotBeEmpty"];
  if(!req.body.email) errors.email = req.lang["errors.cannotBeEmpty"];
  if(!req.body.title) errors.title = req.lang["errors.cannotBeEmpty"];
  if(!req.body.text) errors.text = req.lang["errors.cannotBeEmpty"];

  if(Object.keys(errors).length != 0){
    req.flash.errors = errors;
    return res.redirect('/articles/publish');
  }
  
  let date = new Date(); 
  
  let article = new Article({
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    slug: slug(req.body.title),
    text: req.body.text,
    views: 0,
    date: date.toLocaleString()
  });

  article.save(function(err){
    if(err) return errors404(req, res);
    return res.redirect('/articles/browse');
  });
}


//Publish on comment && increase count comments on specific user 
module.exports.handlePublishComment = function(req, res){  
  let errors = {};

  if(!req.body.author) errors.author = req.lang["errors.cannotBeEmpty"];
  if(!req.body.comment) errors.comment = req.lang["errors.cannotBeEmpty"];

  if(Object.keys(errors).length != 0){
    req.flash.errors = errors;
    return res.redirect('back');
  }
  
  let comment = new Comment({
    articleId: req.body.articleId,
    author: req.body.author,
    comment: req.body.comment,
    likeIps: []
  });

  if(typeof req.session.user != "undefined"){
    User.findOne({_id: req.session.user._id}, function(err, user){
      if(err || !user) return error404(req, res);
      user.comments++;
      user.save(function(err){
        if(err) return error404(req, res);
      });
    });
  }

  comment.save(function(err){
    if(err) return error404(req, res);
    return res.redirect('back');
  });
}