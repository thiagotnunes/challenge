var uploadPath = '/public/uploads';
var TMPDIR = __dirname + uploadPath;

// Custom modules
var filesParser = require('./lib/files_parser')(uploadPath);
var tracker = require('./lib/uploads_tracker')();
var uploadsParser = require('./lib/uploads_parser')(TMPDIR, filesParser, tracker);

// Vendor modules
var formidable = require('formidable');
var express = require('express');
var uuid = require('node-uuid');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/javascript/html5'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res) {
  res.render('index', { fileUuid: uuid.v4() });
});

app.get('/public/uploads/:filename', function(req, res) {
  res.sendfile(__dirname + '/public/uploads/' + req.params.filename);
});

app.post('/upload/:fileUuid', function(req, res) {
  uploadsParser.handle(new formidable.IncomingForm(), req, res);
});

app.get('/progress/:fileUuid', function(req, res) {
  var progress = tracker.progressFor(req.params.fileUuid);
  res.json({
    uuid: req.params.fileUuid,
    progress: progress
  });
});

app.listen(3000);
