describe('Upload View', function () {
  var ids = {
    progress: 'progressId',
    uploadPath: 'uploadPathId',
    form: 'formId',
    file: 'fileId',
    iframe: 'iframeId'
  };
  var progressElement;
  var pathElement;
  var view;

  beforeEach(function() {
    view = uploadView(ids);
    $('<div id="' + ids.progress + '"></div>').appendTo($('#fixtures'));
    $('<div id="' + ids.uploadPath + '"></div>').appendTo($('#fixtures'));
    $('<form id="' + ids.form + '"></form>').appendTo($('#fixtures'));
    $('<input id="' + ids.file + '" type="file"></input>').appendTo($('#fixtures'));
    $('<iframe id="' + ids.iframe + '"></iframe>').appendTo($('#fixtures'));
    progressElement = $('#' + ids.progress);
    pathElement = $('#' + ids.uploadPath);
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

    var uploadedTo = pathElement.children();
    expect(uploadedTo.attr('href')).toBe('this is the file path');
    expect(uploadedTo.text()).toBe('Uploaded to here.');
  });

  it('should show unknown progress message', function() {
    view.displayUnknownProgress();

    expect(progressElement.text()).toBe('Unable to retrieve upload progress.');
  });

  it('should fetch the form', function() {
    var form = view.form();

    expect(form[0]).toBe($('#' + ids.form)[0]);
  });

  it('should fetch the file input', function() {
    var file = view.file();

    expect(file[0]).toBe($('#' + ids.file)[0]);
  });

  it('should fetch the iframe', function() {
    var iframe = view.iframe();

    expect(iframe[0]).toBe($('#' + ids.iframe)[0]);
  });

  it('should clean the progress and path elements', function() {
    progressElement.text('garbage');
    pathElement.text('another garbage');

    view.clearUploadedData();

    expect(progressElement.text()).toBe('');
    expect(pathElement.text()).toBe('');
  });
});

