describe('Form parser', function() {
  var response;
  var parser;

  beforeEach(function() {
    response = {
      contentType: function() {},
      send: function() {}
    };
  });

  it('should parse the form', function() {
    var files = {};
    var filesParser = {
      first: sinon.stub().withArgs(files).returns({})
    };
    parser = require('../../lib/form_parser.js')(response, filesParser);

    var responseMock = sinon.mock(response);
    responseMock.expects("contentType").withArgs("text/plain").once();
    responseMock.expects("send").withArgs(JSON.stringify({})).once();

    parser.parse(null, null, files);

    responseMock.verify();
  });
});
