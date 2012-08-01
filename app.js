// Uploads Path
var uploadPath = '/public/uploads';
var TMPDIR = __dirname + uploadPath;

// Custom modules
var filesParser = require('./lib/files_parser');
var uploadsDao = require('./lib/uploads_dao');
var progressTracker = require('./lib/progress_tracker');
var uploadsParser = require('./lib/uploads_parser');

// Vendor modules
var formidable = require('formidable');
var express = require('express');
var uuid = require('node-uuid');

// Application variables
var app = express();
var parser = filesParser(uploadPath);
var dao = uploadsDao();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/javascript'));
app.use('html5', express.static(__dirname + '/public/javascript/html5'));
app.use('fallback', express.static(__dirname + '/public/javascript/fallback'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res) {
  res.render('index', { id: uuid.v4() });
});

app.get('/public/uploads/:filename', function(req, res) {
  res.sendfile(__dirname + '/public/uploads/' + req.params.filename);
});

app.post('/upload/:id', function(req, res) {
  var tracker = progressTracker(req.params.id, dao);
  uploadsParser(TMPDIR, parser, tracker).handle(new formidable.IncomingForm(), req, res);
});

app.get('/progress/:id', function(req, res) {
  var id = req.params.id;
  var progress = dao.progressFor(id);
  res.json({
    id: id,
    progress: progress
  });
});

app.listen(3000);
