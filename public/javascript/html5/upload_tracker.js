function html5UploadTracker(progressId) {
  var progressElement = '#' + progressId;

  var displayProgress = function(evt) {
    if (evt.lengthComputable) {
      var progress = evt.loaded * 100 / evt.total;
      $(progressElement).text(progress.toFixed(0) + '%');
    } else {
      $(progressElement).text("Unable to compute file length");
    }
  };

  var displayError = function() {
    $(progressElement).text('There was an error attempting to upload the file, please try again.');
  };

  var displayAbortion = function() {
    $(progressElement).text('File upload has been aborted. Oh no!');
  };

  var displayCompletion = function(evt) {
    var path = JSON.parse(evt.target.responseText)['path'];
    var link = $('<a></a>');
    link.attr('id', 'uploadedTo');
    link.attr('href', path);
    link.text('Uploaded to here.');
    $(progressElement).append(link);
  };

  return {
    displayProgress: displayProgress,
    displayError: displayError,
    displayAbortion: displayAbortion,
    displayCompletion: displayCompletion
  };
}
