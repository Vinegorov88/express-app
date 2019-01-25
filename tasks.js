/Задачи/{
    да сложа коментари навсякъде
    да си довърша търсачката и на англииски резултата (успех)
    Users --> Messages (да може потребитела да си чете съобщенията като влезне в профила си)
}


/ Направено/{
    ContactUs
}


/Въпроси към Бако/{
 1. Имам повторение пак на кода в header-ра заради различките класове който използам при логнат потребител. Как да го направя?
 3. Users -> show
}


/Бъгове/{
    
}



module.exports.search = function(req, res){

    if(Object.keys(req.query).length != 0){
        function escapeRegex(text) {
            return text.toString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        let result = [];

        for(value in req.query){
            result.push(value)
        }

        let regex = new RegExp(escapeRegex(result), 'gi');
        console.log(regex)
        
        let errors = {};
        let success = {};

        Article.find({title: regex}, function(err, articles){
            if(err) return error404(req, res);
            if(!articles.length) errors.search = req.lang["errors.search.noResult"]

            if(Object.keys(errors).length != 0) {
                req.flash.errors = errors;
                return res.render('pages/search');
            }
            success.search = req.body.query
            req.flash.success = success;
            
            return res.render('pages/query', {articles: articles});
        });
    } else {
        res.render('pages/search');
    }
}