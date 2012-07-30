describe('HTML 5 Upload Tracker', function () {
  var progress = "fileProgress";
  var tracker;

  beforeEach(function() {
    tracker = html5UploadTracker(progress);
    $('<div id="' + progress + '"></div>').appendTo($('#fixtures'));
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should show the upload progress when the length is computable', function () {
    var evt = {
      lengthComputable: true,
      loaded: 12.54356,
      total: 100
    }

    tracker.displayProgress(evt);

    expect($('#' + progress).text()).toBe('13%');
  });

  it('should show error message when it is not able to compute the file length', function() {
    var evt = {
      lengthComputable: false
    };

    tracker.displayProgress(evt);

    expect($('#' + progress).text()).toBe('Unable to compute file length');
  });

  it('should show error message when the upload has failed', function() {
    tracker.displayError();

    expect($('#' + progress).text()).toBe('There was an error attempting to upload the file, please try again.');
  });

  it('should show abort message when the upload has been aborted', function() {
    tracker.displayAbortion();

    expect($('#' + progress).text()).toBe('File upload has been aborted. Oh no!');
  });

  it('should show completion message when the upload has been completed', function() {
    var evt = {
      target: {
        responseText: JSON.stringify({ path: 'this is the file path' })
      }
    };

    tracker.displayCompletion(evt);

    var uploadedTo = $('#uploadedTo');
    expect(uploadedTo.attr('href')).toBe('this is the file path');
    expect(uploadedTo.text()).toBe('Uploaded to here.');
  });
});

