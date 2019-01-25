let Article = require('../models/Article');
let error404 = require('../services/error404');


//Verification for existing article
module.exports.handleSearch = function(req, res){

    if(!req.query.query){
        res.render('pages/search');
    } 
    else {    

        let errors = {};
        let success = {};

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        let regex = new RegExp(escapeRegex(req.query.query), 'gi');

        Article.find({title: regex}, function(err, articles){
            if(err) return error404(req, res);
            if(!articles.length) errors.query = req.lang["errors.search.noResult"]
   

            if(Object.keys(errors).length != 0) {
                req.flash.errors = errors;
                return res.render('pages/search');
            }
 
            return res.render('pages/search', {articles: articles});
        });
    }  
}