describe('Uploads parser', function() {
  var form;
  var formParser;
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
    formParser = {
      parse: function() {}
    };
    parser = require('../../lib/uploads_parser')('uploadDir', formParser, tracker);
  });

  it('should handle the upload', function() {
    var request = {};
    var mockForm = sinon.mock(form);
    mockForm.expects("on").withArgs("progress", tracker.trackProgress).once();
    mockForm.expects("parse").withArgs(request, formParser.parse).once();

    parser.handle(form, request);

    expect(form.uploadDir).to.be.equal('uploadDir');
    mockForm.verify();
  });
});
