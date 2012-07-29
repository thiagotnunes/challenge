var uploadPath = '/public/uploads';
var TMPDIR = __dirname + uploadPath;
var filesParser = require('./lib/files_parser')(uploadPath);
var uploadsParser = require('./lib/uploads_parser')(TMPDIR, filesParser);

var formidable = require('formidable');
var app = require('express').createServer();

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
}); 

app.get('/public/uploads/:filename', function(req, res) {
  res.sendfile(__dirname + '/public/uploads/' + req.params.filename);
});

app.post('/upload', function(req, res) {
  uploadsParser.handle(new formidable.IncomingForm(), req, res);
});

app.listen(3000);
