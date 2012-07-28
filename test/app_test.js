var http = require('request');
require('should');

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
    var uploadData = {
      method: 'POST',
      uri: uploadUrl,
      multipart: [
        {
          'content-type': 'application/json',
          body: JSON.stringify({yoda_attachment: 'this is'})
        }
      ]
    };
    http(uploadData, function(error, response, body) {
      response.statusCode.should.equal(200);
      response.headers['content-type'].should.equal('application/json; charset=utf-8');
      var uploaded = JSON.parse(body);
      http.get(baseUrl + uploaded.path, function(err, res, bod) {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });
});
