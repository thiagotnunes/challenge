describe('HTML 5 Uploader', function () {
  var binder;
  var formData;
  var uploader;

  beforeEach(function () {
    binder = {
      bindEventsTo: function() {}
    };
    formData = {
      from: function() {}
    };
    uploader = html5Uploader(binder, formData);
  });

  it('should upload the form data', function() {
    var xhr = {
      open: function() {},
      send: function() {}
    };
    var data = {};
    var mockedBinder = sinon.mock(binder);
    var mockedFactory = sinon.mock(formData);
    var mockedXhr = sinon.mock(xhr);

    mockedBinder.expects("bindEventsTo").withArgs(xhr);
    mockedFactory.expects("from").withArgs("form").returns(data);

    mockedXhr.expects("open").withArgs("POST", "upload url").once();
    mockedXhr.expects("send").withArgs(data).once();
    XMLHttpRequest = sinon.mock().returns(xhr);

    uploader.upload("form", "upload url");

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();

    mockedBinder.verify();
    mockedFactory.verify();
    mockedXhr.verify();
  });
});

