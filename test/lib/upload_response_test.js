describe('Upload response', function() {

  var id;
  var file;
  var fields;
  var mockDao;
  var mockResponse;
  var _uploadResponse;
  var validator;

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
    validator = {
      validate: function() {}
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
    _uploadResponse = require('../../lib/upload_response.js')(id, response, dao, validator);
  });

  describe('Uploading the file', function() {
    it('should respond to upload with json representation of the file', function() {
      mockResponse.expects("contentType").withArgs("text/plain").once();
      mockResponse.expects("send").withArgs(JSON.stringify(file)).once();
      mockDao.expects("create").withArgs(id, file).once();

      _uploadResponse.uploadCallback(file, fields);

      mockResponse.verify();
      mockDao.verify();
    });
  });

  describe('Saving the upload', function() {

    it('should add description to the existing file and render the show page', function() {
      sinon.stub(validator, "validate").withArgs(id, fields).returns(true);
      var upload = {};
      mockDao.expects("update").withArgs(id, fields).once();
      mockDao.expects("find").withArgs(id).returns(upload).once();
      mockResponse.expects("render").withArgs("show", { upload: upload }).once();

      _uploadResponse.saveCallback(file, fields); 

      mockDao.verify();
    });

    it('should render index with error when the id or fields are not valid', function() {
      sinon.stub(validator, "validate").withArgs(id, fields).returns(false);
      mockResponse.expects("render").withArgs("index", { id: id, error: 'Please make sure you upload a file and then add a description before saving the upload' }); 

      _uploadResponse.saveCallback(file, fields);

      mockResponse.verify();
    });
  });
});
