describe('HTML 5 Uploader', function () {
  var binder;
  var factory;
  var uploader;

  beforeEach(function () {
    binder = {
      bindEventsTo: function() {}
    };
    factory = {
      from: function() {}
    };
    uploader = html5Uploader(binder, factory);
  });

  it('should upload the form data', function() {
    var xhr = {
      open: function() {},
      send: function() {}
    };
    var formData = {};
    var mockedBinder = sinon.mock(binder);
    var mockedFactory = sinon.mock(factory);
    var mockedXhr = sinon.mock(xhr);

    mockedBinder.expects("bindEventsTo").withArgs(xhr);
    mockedFactory.expects("from").withArgs("form").returns(formData);

    mockedXhr.expects("open").withArgs("POST", "upload url").once();
    mockedXhr.expects("send").once();
    XMLHttpRequest = sinon.mock().returns(xhr);

    uploader.upload("form", "upload url");

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();

    mockedBinder.verify();
    mockedFactory.verify();
    mockedXhr.verify();
  });
});

