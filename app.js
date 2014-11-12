var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//主页
var routes = require('./routes/index');
app.use('/', routes);
//个人网站
var myWebsiteSvr = require('./routes/myWebSiteSvr');
app.use('/myWebsiteSvr', myWebsiteSvr);
//视频服务
var videoServiceSvr = require('./routes/videoServiceSvr');
app.use('/videoServiceSvr', videoServiceSvr);
//队列服务
var jQueueSvr = require('./routes/jQueueSvr');
app.use('/jQueueSvr', jQueueSvr);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'apps')));
app.use(express.static(path.join(__dirname, 'public')));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
