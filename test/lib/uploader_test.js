describe('Uploader', function() {
  var form;
  var formParser;
  var request;
  var uploader;

  beforeEach(function() {
    form = {
      parse: function() {},
      on: function() {}
    };
    formParser = {
      parse: function() {}
    };
    request = {};
    uploader = require('../../lib/uploader')(formParser);
  });

  it('should process the given request and track its progress', function() {
    var tracker = {
      trackProgress: function() {}
    };
    var mockForm = sinon.mock(form);
    mockForm.expects("on").withArgs("progress", tracker.trackProgress).once();
    mockForm.expects("parse").withArgs(request, formParser.parse).once();

    uploader.processAndTrackProgress(form, request, tracker);

    mockForm.verify();
  });

  it('should process the given request', function() {
    var mockForm = sinon.mock(form);
    mockForm.expects("parse").withArgs(request, formParser.parse).once();

    uploader.process(form, request);

    mockForm.verify();
  });
});
