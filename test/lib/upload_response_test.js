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
      send: function() {},
      render: function() {}
    };
    var dao = {
      create: function() {},
      update: function() {},
      find: function() {}
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

  it('should add description to the existing file and render the show page', function() {
    var upload = {};
    mockDao.expects("update").withArgs(id, fields).once();
    mockDao.expects("find").withArgs(id).returns(upload).once();
    mockResponse.expects("render").withArgs("show", { upload: upload }).once();

    _uploadResponse.saveCallback(file, fields); 

    mockDao.verify();
  });
});
