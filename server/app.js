var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
    const accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }
    const ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
