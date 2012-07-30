describe('Progress tracker', function() {
  var tracker;
  var uploadTracker;
  var xhr;

  beforeEach(function() {
    uploadTracker = {
      displayProgress: function() {},
      displayError: function() {}
    };
    xhr = {
      open: function() {},
      onreadystatechange: {},
      send: function() {},
    };
    XMLHttpRequest = sinon.mock().returns(xhr);
    tracker = fallbackProgressTracker(uploadTracker);
  });

  it('should display progress when request completes successfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 200;
    var mockUploadTracker = sinon.mock(uploadTracker);
    mockUploadTracker.expects("displayProgress").withArgs(xhr).once();

    tracker.checkProgressOn('url');
    xhr.onreadystatechange();

    mockUploadTracker.verify();
  });

  it('should display error when request completes unsuccessfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 404;

    var mockUploadTracker = sinon.mock(uploadTracker);
    mockUploadTracker.expects("displayError").once();

    tracker.checkProgressOn('url');
    xhr.onreadystatechange();

    mockUploadTracker.verify();
  });

  it('should make a request to progress url', function() {
    var url = '/progress/101';
    var mockedXhr = sinon.mock(xhr);

    mockedXhr.expects("open").withArgs("GET", url).once();
    mockedXhr.expects("send").once();

    tracker.checkProgressOn(url);

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();
    mockedXhr.verify();
  });
});
