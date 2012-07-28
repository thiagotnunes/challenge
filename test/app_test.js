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

  describe('File upload', function() {

    var uploadUrl = baseUrl + '/upload';
    var attachment = {yoda: 'i am'};
    var uploadData = {
      method: 'POST',
      uri: uploadUrl,
      multipart: [
        {
          'content-type': 'application/json',
          body: JSON.stringify(attachment)
        }
      ]
    };

    it('should upload a file to the server and receive the file path on the response', function(done) {
      http(uploadData, function(error, response, body) {
        var uploaded = JSON.parse(body);
        http.get(baseUrl + uploaded.path, function(err, res, bod) {
          var actual_attachment = JSON.parse(bod);
          actual_attachment['yoda'].should.equal(attachment['yoda']);
          done();
        });
      });
    });

  });

});
