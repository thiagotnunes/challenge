var expect = require('chai').expect;
var http = require('request');

describe('API tests', function() {
  var baseUrl = 'http://localhost:3000';

  it('should get OK for index', function(done) {
    http.get(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  describe('File upload', function() {
    var uploadUrl = baseUrl + '/upload/101';
    var attachment = {yoda: 'i am'};
    var uploadData = function() {
      return {
        method: 'POST',
        uri: uploadUrl,
        multipart: [
          {
            'content-type': 'application/json',
            body: JSON.stringify(attachment)
          }
        ]
      };
    };

    it('should upload a file to the server and receive the file path on the response', function(done) {
      http(uploadData(), function(error, response, body) {
        var uploaded = JSON.parse(body);
        http.get(baseUrl + uploaded.path, function(err, res, bod) {
          var actual_attachment = JSON.parse(bod);
          expect(actual_attachment['yoda']).to.equal(attachment['yoda']);
          done();
        });
      });
    });

    it('should have a 100% progress when file is done uploading', function(done){
      http(uploadData(), function(error, response, body) {
        var uploaded = JSON.parse(body);
        http.get(baseUrl + '/progress/101', function(err, res, bod) {
          var file = JSON.parse(bod);
          expect(file.id).to.equal('101');
          expect(file.progress).to.equal('100');
          done();
        });
      });
    });
  });
});
