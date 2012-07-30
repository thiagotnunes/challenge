describe('HTML5 Event binder', function () {
  var listener;
  var binder;

  beforeEach(function () {
    listener = {
      progress: function() {},
      load: function() {},
      error: function() {},
      abort: function() {}
    };
    binder = html5EventBinder(listener);
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
    mockedUpload.expects("addEventListener").withArgs("progress", listener.progress).once();
    mockedXhr.expects("addEventListener").withArgs("load", listener.load).once();
    mockedXhr.expects("addEventListener").withArgs("error", listener.error).once();
    mockedXhr.expects("addEventListener").withArgs("abort", listener.abort).once();

    binder.bindEventsTo(xhr);

    mockedUpload.verify();
    mockedXhr.verify();
  });
});

