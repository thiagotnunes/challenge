describe('Event binder', function () {
  var tracker;
  var binder;

  beforeEach(function () {
    tracker = {
      displayProgress: function() {},
      displayError: function() {},
      displayAbortion: function() {},
      displayCompletion: function() {}
    };
    binder = html5EventBinder(tracker);
  });

  it('should bind events to the xhr', function () {
    var upload = {
      addEventListener: function() {},
    };
    var xhr = {
      addEventListener: function() {},
      upload: upload
    };
    var mockedUpload = sinon.mock(upload);
    var mockedXhr = sinon.mock(xhr);
    mockedUpload.expects("addEventListener").withArgs("progress", tracker.displayProgress).once();
    mockedXhr.expects("addEventListener").withArgs("load", tracker.displayCompletion).once();
    mockedXhr.expects("addEventListener").withArgs("error", tracker.displayError).once();
    mockedXhr.expects("addEventListener").withArgs("abort", tracker.displayAbortion).once();

    binder.bindEventsTo(xhr);

    mockedUpload.verify();
    mockedXhr.verify();
  });
});

