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
      unbind: function() {},
      attr: function() {}
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

  it('should register interval on the tracker, set the iframe load function and then submit the form with the proper url', function() {
    var form = { 
      submit: function() {},
      attr: function() {},
      removeAttr: function() {}
    };
    var iframeId = "iframe id"
    var previousUrl = "previous action";
    var uploadUrl = "upload url";
    var mockForm = sinon.mock(form);
    mockForm.expects("attr").withArgs("action").returns(previousUrl).once();
    mockForm.expects("attr").withArgs("action", uploadUrl).once();
    mockForm.expects("attr").withArgs("target", iframeId).once();
    mockForm.expects("submit").once();
    mockForm.expects("attr").withArgs("action", previousUrl).once();
    mockForm.expects("removeAttr").withArgs("target").once();
    var mockIframe = sinon.mock(iframe);
    mockIframe.expects("unbind").once();
    mockIframe.expects("attr").withArgs("id").returns(iframeId).once();
    setInterval = sinon.mock();
    setInterval.withArgs(progressTracker.checkProgress, 2000).returns('interval');

    uploader.upload(form, uploadUrl);

    setInterval.verify();
    mockIframe.verify();
    mockForm.verify();
  });
});

