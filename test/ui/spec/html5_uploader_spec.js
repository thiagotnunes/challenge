describe('HTML 5 Uploader', function () {
  var binder;
  var uploader;

  beforeEach(function () {
    binder = {
      bindEventsTo: function() {}
    };
    uploader = html5Uploader(binder);
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should create the formdata using the form', function() {
    var form = $('<form id="form"></form>');
    form.appendTo($('#fixtures'));
    
    FormData = sinon.spy();

    uploader.formDataFrom("form");

    expect(FormData.calledWithNew()).toBeTruthy();
    expect(FormData.calledWith(form[0])).toBeTruthy();
  });

  it('should upload the form data', function() {
    var xhr = {
      open: function() {},
      send: function() {}
    };
    var mockedXhr = sinon.mock(xhr);
    var mockedBinder = sinon.mock(binder);

    mockedXhr.expects("open").withArgs("POST", "upload url").once();
    mockedXhr.expects("send").once();
    XMLHttpRequest = sinon.mock().returns(xhr);

    mockedBinder.expects("bindEventsTo").withArgs(xhr);

    uploader.upload("form", "upload url");

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();

    mockedXhr.verify();
    mockedBinder.verify();
  });
});

