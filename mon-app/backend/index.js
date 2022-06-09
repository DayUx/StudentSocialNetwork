const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');

const login = require('./api/login');
const register = require('./api/register');


const app = express();

//Création d'une session avec cookie pour la persistance
app.use(cookieSession({
    secret: 'qitBmMSV9xxsp3EB47vO0w',
    resave: false,
    saveUninitialized: true,
    maxAge: 2147483647
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/home', home);
// app.use('/login', login);
// app.use('/profile', profile);
// app.use('/register', register);
// app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    createError(404);
    res.sendStatus(404);
});

// error handler
app.use(function(req, res, err) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log("Server running on http://localhost:3000")
module.exports = app;