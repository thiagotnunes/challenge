describe('Form parser', function() {
  it('should parse the form', function() {
    var callback = sinon.spy();
    var files = {};
    var file = {};
    var filesParser = {
      first: function() {}
    };
    var parser = require('../../lib/form_parser.js')(callback, filesParser);
    var mockFilesParser = sinon.mock(filesParser);
    mockFilesParser.expects("first").withArgs(files).returns(file).once();

    parser.parse(null, null, files);

    expect(callback.calledWith(file)).to.be.ok;
  });
});
