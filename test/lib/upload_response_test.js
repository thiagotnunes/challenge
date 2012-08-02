describe('Upload response', function() {

  var id;
  var file;
  var fields;
  var mockDao;
  var mockResponse;
  var _uploadResponse;

  beforeEach(function() {
    var response = {
      contentType: function() {},
      send: function() {}
    };
    var dao = {
      create: function() {},
      update: function() {}
    };
    id = '101';
    file = {
      path: 'this is the path'
    };
    fields = {
      description: 'this is the description'
    };
    mockDao = sinon.mock(dao);
    mockResponse = sinon.mock(response);
    _uploadResponse = require('../../lib/upload_response.js')(id, response, dao);
  });

  it('should respond to upload with json representation of the file', function() {
    mockResponse.expects("contentType").withArgs("text/plain").once();
    mockResponse.expects("send").withArgs(JSON.stringify(file)).once();
    mockDao.expects("create").withArgs(id, file).once();

    _uploadResponse.uploadCallback(file, fields);

    mockResponse.verify();
    mockDao.verify();
  });

  it('should add description to the existing file and redirect user to the show page', function() {
    mockDao.expects("update").withArgs(id, fields).once();

    _uploadResponse.saveCallback(file, fields); 

    mockDao.verify();
  });
});
