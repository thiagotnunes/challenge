describe('Upload View', function () {
  var progress = "fileProgress";
  var view;

  beforeEach(function() {
    view = uploadView(progress);
    $('<div id="' + progress + '"></div>').appendTo($('#fixtures'));
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should show the upload progress', function () {
    view.displayProgress(12.5674);

    expect($('#' + progress).text()).toBe('13%');
  });

  it('should show error message when the upload has failed', function() {
    view.displayError();

    expect($('#' + progress).text()).toBe('There was an error attempting to upload the file, please try again.');
  });

  it('should show abort message when the upload has been aborted', function() {
    view.displayAbortion();

    expect($('#' + progress).text()).toBe('File upload has been aborted. Oh no!');
  });

  it('should show completion message when the upload has been completed', function() {
    view.displayCompletion('this is the file path');

    var uploadedTo = $('#uploadedTo');
    expect(uploadedTo.attr('href')).toBe('this is the file path');
    expect(uploadedTo.text()).toBe('Uploaded to here.');
  });
});

