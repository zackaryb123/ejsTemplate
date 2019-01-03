var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

let reqSession;

app.post('/info', (req, res) => {
  reqSession = req.session;
  reqSession.name = req.body.name;
  res.send('done');
});

app.get('/nextpage', function(req, res) {
  reqSession = req.session;
  if(reqSession.name){
    res.writeHead(200,"Content-Type", 'application/json');
    res.write(`<h1>Next Page</h1><br>Name: ${reqSession.name}<br><br>`);
    res.end(`<a href="/">home</a>`);
  } else {
   res.sendFile(`index.html`);
  }
});

module.exports = app;
