describe('Upload response', function() {
  it('should respond to upload with json representation of the file', function() {
    var id = '101';
    var response = {
      contentType: function() {},
      send: function() {}
    };
    var dao = {
      create: function() {}
    };
    var file = {
      path: 'this is the path'
    };
    var mockResponse = sinon.mock(response);
    mockResponse.expects("contentType").withArgs("text/plain").once();
    mockResponse.expects("send").withArgs(JSON.stringify(file)).once();
    var mockDao = sinon.mock(dao);
    mockDao.expects("create").withArgs(id, file).once();

    var _uploadResponse = require('../../lib/upload_response.js')(id, response, dao);
    _uploadResponse.uploadCallback(file);

    mockResponse.verify();
    mockDao.verify();
  });
});
