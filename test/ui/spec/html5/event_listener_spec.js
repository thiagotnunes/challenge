describe('HTML 5 Event listener', function () {
  var listener;
  var mockView;

  beforeEach(function () {
    var view = {
      displayProgress: function() {},
      displayError: function() {},
      displayAbortion: function() {},
      displayCompletion: function() {},
      displayUnknownProgress: function() {}
    };
    mockView = sinon.mock(view);
    listener = html5EventListener(view);
  });

  afterEach(function() {
    mockView.verify();
  });

  it('should retrieve the progress from the event and display it when length is computable', function () {
    var evt = {
      lengthComputable: true,
      loaded: 10,
      total: 50
    };
    mockView.expects("displayProgress").withArgs(20).once();

    listener.progress(evt);
  });

  it('should display unknown progress when length is not computable', function() {
    var evt = {
      lengthComputable: false
    };
    mockView.expects("displayUnknownProgress").once();

    listener.progress(evt);
  });

  it('should retrieve the path from the event and display it', function() {
    var evt = {
      target: {
        responseText: JSON.stringify({ path: 'this is the file path' })
      }
    };
    mockView.expects("displayCompletion").withArgs('this is the file path').once();

    listener.load(evt);
  });

  it('should display error message', function() {
    mockView.expects("displayError").once();

    listener.error();
  });

  it('should display abortion message', function() {
    mockView.expects("displayAbortion").once();

    listener.abort();
  });
});

