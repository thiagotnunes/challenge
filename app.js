var formidable = require('formidable');
var app = require('express').createServer();

var TMPDIR = './public/uploads';

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
    var key = Object.keys(files)[0];
    var fullPath = files[key]['path'];
    var name = fullPath.slice(fullPath.lastIndexOf('/') + 1);
    var path = '/public/uploads/' + name;
    res.json({
      path: path
    });
  });
});

app.listen(3000);
