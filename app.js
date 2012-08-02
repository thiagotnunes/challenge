// Upload Path
var uploadPath = '/public/uploads';

// Custom modules
var filesParser = require('./lib/files_parser');
var formParser = require('./lib/form_parser');
var uploadsDao = require('./lib/uploads_dao');
var progresses = require('./lib/progresses');
var progressTracker = require('./lib/progress_tracker');
var uploadResponse = require('./lib/upload_response');
var uploader = require('./lib/uploader');

// Vendor modules
var formidable = require('formidable');
var express = require('express');
var uuid = require('node-uuid');

// Application variables
var app = express();
var _filesParser = filesParser(uploadPath);
var _progresses = progresses();
var _uploadsDao = uploadsDao();

// Express configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/javascript'));
app.use('html5', express.static(__dirname + '/public/javascript/html5'));
app.use('fallback', express.static(__dirname + '/public/javascript/fallback'));
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get('/', function(req, res) {
  res.render('index', { id: uuid.v4() });
});

app.get('/public/uploads/:filename', function(req, res) {
  res.sendfile(__dirname + '/public/uploads/' + req.params.filename);
});

app.post('/upload/:id', function(req, res) {
  var id = req.params.id;
  var tracker = progressTracker(id, _progresses);
  var responseHandler = uploadResponse(id, res, _uploadsDao);
  var parser = formParser(responseHandler.uploadCallback, _filesParser);

  uploader(parser).processAndTrackProgress(new formidable.IncomingForm(), req, tracker);
});

app.post('/save/:id', function(req, res) {
  var id = req.params.id;
  var responseHandler = uploadResponse(id, res, _uploadsDao);
  var parser = formParser(responseHandler.saveCallback, _filesParser);

  uploader(parser).process(new formidable.IncomingForm(), req);
});

app.get('/progress/:id', function(req, res) {
  var id = req.params.id;
  var progress = _progresses.progressFor(id);

  res.json({
    id: id,
    progress: progress
  });
});

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('App started listening on port ' + port);
