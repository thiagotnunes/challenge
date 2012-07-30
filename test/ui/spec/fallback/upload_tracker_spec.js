describe('Upload Tracker', function() {
  var progress = 'fileProgress';
  var tracker;

  beforeEach(function() {
    tracker = fallbackUploadTracker(progress);
    $('<div id="' + progress + '"></div>').appendTo($('#fixtures'));
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should display progress of the current upload', function() {
    var xhr = {
      responseText: JSON.stringify({ progress: '50' })
    };

    tracker.displayProgress(xhr);

    expect($('#' + progress).text()).toBe('50%');
  });

  it('should display error when upload fails', function() {
    tracker.displayError();

    expect($('#' + progress).text()).toBe('There was an error attempting to upload the file, please try again.');
  });

  it('should display completion when upload finishes', function() {
    var xhr = {
      responseText: JSON.stringify({ path: 'file path' })
    };

    tracker.displayCompletion(xhr);

    var uploadedTo = $('#uploadedTo');
    expect(uploadedTo.attr('href')).toBe('file path');
    expect(uploadedTo.text()).toBe('Uploaded to here.');
  });
});
