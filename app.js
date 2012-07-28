var uploadPath = '/public/uploads';
var TMPDIR = '.' + uploadPath;

var uploadParser = require('./lib/upload').parser(uploadPath); 
var formidable = require('formidable');
var app = require('express').createServer();

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
}); 

app.get('/public/uploads/:filename', function(req, res) {
  res.sendfile(__dirname + '/public/uploads/' + req.params.filename);
});

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = TMPDIR;
  form.parse(req, function(error, fields, files) {
    res.json(uploadParser.parse(files));
  });
});

app.listen(3000);
