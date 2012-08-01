describe('Uploader', function() {
  var form;
  var formParser;
  var tracker;
  var uploader;

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
    uploader = require('../../lib/uploader')(formParser, tracker);
  });

  it('should process the given request', function() {
    var request = {};
    var mockForm = sinon.mock(form);
    mockForm.expects("on").withArgs("progress", tracker.trackProgress).once();
    mockForm.expects("parse").withArgs(request, formParser.parse).once();

    uploader.process(form, request);

    mockForm.verify();
  });
});
