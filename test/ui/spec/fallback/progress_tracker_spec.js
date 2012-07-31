describe('Fallback Progress tracker', function() {
  var tracker;
  var view;
  var xhr;

  beforeEach(function() {
    view = {
      displayProgress: function() {},
      displayError: function() {}
    };
    xhr = {
      open: function() {},
      onreadystatechange: {},
      send: function() {},
    };
    XMLHttpRequest = sinon.mock().returns(xhr);
    tracker = fallbackProgressTracker('/progress/101', view);
  });

  it('should make a request to progress url', function() {
    var mockedXhr = sinon.mock(xhr);

    mockedXhr.expects("open").withArgs("GET", '/progress/101').once();
    mockedXhr.expects("send").once();

    tracker.checkProgress();

    expect(XMLHttpRequest.calledWithNew()).toBeTruthy();
    mockedXhr.verify();
  });

  it('should display progress when request completes successfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 200;
    xhr['responseText'] = JSON.stringify({ progress: '33' });
    var mockView = sinon.mock(view);
    mockView.expects("displayProgress").withArgs('33').once();

    tracker.checkProgress();
    xhr.onreadystatechange();

    mockView.verify();
  });

  it('should display error when request completes unsuccessfully', function() {
    xhr['readyState'] = 4;
    xhr['status'] = 404;

    var mockView = sinon.mock(view);
    mockView.expects("displayError").once();

    tracker.checkProgress();
    xhr.onreadystatechange();

    mockView.verify();
  });
});
