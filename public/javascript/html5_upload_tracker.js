function html5UploadTracker() {
  var displayProgress = function(evt) {
    if (evt.lengthComputable) {
      var progress = evt.loaded * 100 / evt.total;
      $('#progress').text(progress.toFixed(0) + '%');
    } else {
      $('#progress').text("Unable to compute file length");
    }
  };

  var displayError = function() {
    $('#progress').text('There was an error attempting to upload the file, please try again.');
  };

  var displayAbortion = function() {
    $('#progress').text('File upload has been aborted. Oh no!');
  };

  var displayCompletion = function(evt) {
    var path = JSON.parse(evt.target.responseText)['path'];
    var link = $('<a></a>');
    link.attr('id', 'uploadedTo');
    link.attr('href', path);
    link.text('Uploaded to here.');
    $('#progress').append(link);
  };

  return {
    displayProgress: displayProgress,
    displayError: displayError,
    displayAbortion: displayAbortion,
    displayCompletion: displayCompletion
  };
}
