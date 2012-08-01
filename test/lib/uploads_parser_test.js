describe('Uploads parser', function() {
  var form;
  var filesParser;
  var tracker;
  var parser;

  beforeEach(function() {
    form = {
      parse: function() {},
      on: function() {}
    };
    tracker = {
      trackProgress: function() {}
    };
    parser = require('../../lib/uploads_parser')('uploadDir', filesParser, tracker);
  });

  it('should handle the upload', function() {
    var mockForm = sinon.mock(form);
    mockForm.expects("on").withArgs("progress", tracker.trackProgress).once();

    parser.handle(form);

    expect(form.uploadDir).to.be.equal('uploadDir');
    mockForm.verify();
  });
});
