var app = require('express').createServer();

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
}); 

app.post('/upload', function(req, res) {
  res.json({});
});

app.listen(3000);
