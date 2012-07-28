var app = require('express').createServer();

app.get('/', function(req, res) {
  res.send('Done.');
}); 

app.listen(3000);
