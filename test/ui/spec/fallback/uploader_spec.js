describe('Fallback uploader', function () {
  var iframe;
  var progressTracker;
  var uploader;

  beforeEach(function () {
    progressTracker = {
      uploadComplete: function() {}
    };
    iframe = {
      contents: function() {},
      on: function() {},
      unbind: function() {}
    };
    uploader = fallbackUploader(iframe, progressTracker);

    var form = $('<form />');
    form.attr('id', 'formId');
    form.appendTo($('#fixtures'));
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should call upload complete on the tracker and stop the progress checking', function() {
    var contents = { 
      find: sinon.stub().withArgs('body').returns({ text: sinon.stub().returns('response') })
    };
    var iframeStub = sinon.stub(iframe, "contents").returns(contents);
    var interval = {};
    var mockTracker = sinon.mock(progressTracker);
    mockTracker.expects("uploadComplete").withArgs('response').once();
    clearInterval = sinon.mock();
    clearInterval.once();

    uploader.uploadComplete(interval);

    mockTracker.verify();
    clearInterval.verify()
  });

  it('should register interval on the tracker, set the iframe load function and then submit the form', function() {
    var form = { 
      submit: function() {} 
    };
    var mockForm = sinon.mock(form);
    mockForm.expects("submit").once();
    var mockIframe = sinon.mock(iframe);
    mockIframe.expects("unbind").once();
    setInterval = sinon.mock();
    setInterval.withArgs(progressTracker.checkProgress, 2000).returns('interval');

    uploader.upload(form);

    setInterval.verify();
    mockIframe.verify();
    mockForm.verify();
  });
});

