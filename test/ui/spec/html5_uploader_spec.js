describe('HTML 5 Uploader', function () {
  var tracker;
  var uploader;

  beforeEach(function () {
    tracker = {
      displayProgress: function() {},
      displayError: function() {},
      displayAbortion: function() {},
      displayCompletion: function() {}
    };
    uploader = html5Uploader(tracker);
  });

  afterEach(function() {
    $('#fixtures').text('');
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

    uploader.bindEventsTo(xhr);

    mockedUpload.verify();
    mockedXhr.verify();
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
      addEventListener: function() {},
      upload: { 
        addEventListener: function() {} 
      },
      open: function() {},
      send: function() {}
    };
    var mockedXhr = sinon.mock(xhr);

    mockedXhr.expects("open").withArgs("POST", "upload url").once();
    mockedXhr.expects("send").once();
    XMLHttpRequest = sinon.mock().returns(xhr);

    uploader.upload("form", "upload url");

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();

    mockedXhr.verify();
  });
});

