var http = require('request');
var should = require('should');
var fs = require('fs');

var baseUrl = 'http://localhost:3000';

describe('App', function() {
  it('should get OK for index', function(done) {
    http.get(baseUrl, function(error, response, body) {
      response.statusCode.should.equal(200);
      done();
    });
  });

  it('should upload a file to the server and receive a file path on the response', function(done) {
    var image = 'test/image.png';
    var uploadUrl = baseUrl + '/upload';
    fs.createReadStream(image).pipe(http.post(uploadUrl, function(error, response, body) {
      response.statusCode.should.equal(200);
      response.headers['content-type'].should.equal('application/json; charset=utf-8');
      done();
    }));
  });
});
