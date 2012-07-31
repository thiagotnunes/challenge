describe('Fallback Xhr parser', function() {
  var view;
  var parser;

  beforeEach(function() {
    view = {
      displayProgress: function() {},
      displayError: function() {}
    };
    parser = fallbackXhrParser(view);
  });

  it('should retrieve the progress from xhr and display it', function() {
    var xhr = {
      responseText: JSON.stringify({ progress: '33' })
    };
    var mockView = sinon.mock(view);
    mockView.expects("displayProgress").withArgs('33').once();

    parser.progress(xhr);

    mockView.verify();
  });

  it('should display the error', function() {
    var mockView = sinon.mock(view);
    mockView.expects("displayError").once();

    parser.error();

    mockView.verify();
  });

});
