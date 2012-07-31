describe('Upload View', function () {
  var progress = "fileProgress";
  var path = "uploadedPath";
  var progressElement;
  var view;

  beforeEach(function() {
    view = uploadView(progress, path);
    $('<div id="' + progress + '"></div>').appendTo($('#fixtures'));
    $('<div id="' + path + '"></div>').appendTo($('#fixtures'));
    progressElement = $('#' + progress);
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should show the upload progress', function () {
    view.displayProgress(12.5674);

    expect(progressElement.text()).toBe('13%');
  });

  it('should show error message', function() {
    view.displayError();

    expect(progressElement.text()).toBe('There was an error attempting to upload the file, please try again.');
  });

  it('should show abort message', function() {
    view.displayAbortion();

    expect(progressElement.text()).toBe('File upload has been aborted. Oh no!');
  });

  it('should show completion message', function() {
    view.displayCompletion('this is the file path');

    var uploadedTo = $('#' + path).children();
    expect(uploadedTo.attr('href')).toBe('this is the file path');
    expect(uploadedTo.text()).toBe('Uploaded to here.');
  });

  it('should show unknown progress message', function() {
    view.displayUnknownProgress();

    expect(progressElement.text()).toBe('Unable to retrieve upload progress.');
  });
});

