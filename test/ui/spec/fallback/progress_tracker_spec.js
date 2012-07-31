describe('Fallback Progress tracker', function() {
  var tracker;
  var parser;
  var xhr;

  beforeEach(function() {
    parser = {
      progress: function() {},
      error: function() {}
    };
    xhr = {
      open: function() {},
      onreadystatechange: {},
      send: function() {},
    };
    XMLHttpRequest = sinon.mock().returns(xhr);
    tracker = fallbackProgressTracker(parser);
  });

  it('should parse response when request completes successfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 200;
    var mockParser = sinon.mock(parser);
    mockParser.expects("progress").withArgs(xhr).once();

    tracker.checkProgressOn('url');
    xhr.onreadystatechange();

    mockParser.verify();
  });

  it('should parse error when request completes unsuccessfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 404;

    var mockParser = sinon.mock(parser);
    mockParser.expects("error").once();

    tracker.checkProgressOn('url');
    xhr.onreadystatechange();

    mockParser.verify();
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
