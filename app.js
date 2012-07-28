var app = require('express').createServer();

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
}); 

app.listen(3000);
