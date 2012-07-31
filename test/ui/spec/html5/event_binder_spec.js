describe('HTML5 Event binder', function () {
  var parser;
  var binder;

  beforeEach(function () {
    parser = {
      progress: function() {},
      load: function() {},
      error: function() {},
      abort: function() {}
    };
    binder = html5EventBinder(parser);
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
    mockedUpload.expects("addEventListener").withArgs("progress", parser.progress).once();
    mockedXhr.expects("addEventListener").withArgs("load", parser.load).once();
    mockedXhr.expects("addEventListener").withArgs("error", parser.error).once();
    mockedXhr.expects("addEventListener").withArgs("abort", parser.abort).once();

    binder.bindEventsTo(xhr);

    mockedUpload.verify();
    mockedXhr.verify();
  });
});

