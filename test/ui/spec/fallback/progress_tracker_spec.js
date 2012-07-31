describe('Fallback Progress tracker', function() {
  var tracker;
  var mockView;

  beforeEach(function() {
    var view = {
      displayProgress: function() {},
      displayError: function() {},
      displayCompletion: function() {}
    };
    mockView = sinon.mock(view);
    tracker = fallbackProgressTracker('/progress/101', view);
  });

  describe('Upload progress', function() {
    var xhr;

    beforeEach(function() {
      xhr = {
        open: function() {},
        onreadystatechange: {},
        send: function() {},
      };
      XMLHttpRequest = sinon.mock().returns(xhr);
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
      mockView.expects("displayProgress").withArgs(33).once();

      tracker.checkProgress();
      xhr.onreadystatechange();

      mockView.verify();
    });

    it('should display error when request completes unsuccessfully', function() {
      xhr['readyState'] = 4;
      xhr['status'] = 404;

      mockView.expects("displayError").once();

      tracker.checkProgress();
      xhr.onreadystatechange();

      mockView.verify();
    });
  });

  describe('Upload complete', function() {

    it('should display completion message when uploads completes', function() {
      var response = JSON.stringify({ path: 'this is the returned path' });
      mockView.expects("displayCompletion").withArgs('this is the returned path').once();

      tracker.uploadComplete(response);

      mockView.verify();
    });
  });
});
