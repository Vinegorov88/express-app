
// Require libraries
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-app', {useNewUrlParser: true});
let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./app/config/routes');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let fileUpload = require('express-fileupload');
let pageNotFound = require('./app/middlewares/pageNotFound');
let selectedLanguage = require('./app/middlewares/selectedLanguage');
let refreshSession = require('./app/middlewares/refreshSession');
let flash = require('./app/middlewares/flash');
let setLocals = require('./app/middlewares/setLocals');
let lastOnline = require('./app/middlewares/lastOnline');
let app = express();

// Configure Express
app.set('views', './app/views');
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser('_secret_'));
app.use(session({secret: '_secret_', cookie: { maxAge: 60 * 60 * 1000 }, saveUninitialized: false, resave: false}));
app.use(selectedLanguage);
app.use(refreshSession);
app.use(lastOnline);
app.use(flash);
app.use(setLocals);

// Routes
app.use('/', routes);

// Page not found
app.use(pageNotFound);

// Start server
app.listen(8080, () => console.log('Server listening on port 8080...'));
