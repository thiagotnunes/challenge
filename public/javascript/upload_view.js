function uploadView(progressId, pathId) {
  var progressElement = '#' + progressId;
  var pathElement = '#' + pathId;

  var displayProgress = function(progress) {
    $(progressElement).text(progress.toFixed(0) + '%');
  };

  var displayError = function() {
    $(progressElement).text('There was an error attempting to upload the file, please try again.');
  };

  var displayAbortion = function() {
    $(progressElement).text('File upload has been aborted. Oh no!');
  };

  var displayCompletion = function(path) {
    var link = $('<a></a>');
    link.attr('href', path);
    link.text('Uploaded to here.');
    $(pathElement).append(link);
  };

  var displayUnknownProgress = function() {
    $(progressElement).text('Unable to retrieve upload progress.');
  };

  return {
    displayProgress: displayProgress,
    displayError: displayError,
    displayAbortion: displayAbortion,
    displayCompletion: displayCompletion,
    displayUnknownProgress: displayUnknownProgress
  };
}
