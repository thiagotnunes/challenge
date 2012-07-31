function uploadView(ids) {
  var progressId = '#' + ids.progress;
  var pathId = '#' + ids.uploadPath;

  var displayProgress = function(progress) {
    $(progressId).text(progress.toFixed(0) + '%');
  };

  var displayError = function() {
    $(progressId).text('There was an error attempting to upload the file, please try again.');
  };

  var displayAbortion = function() {
    $(progressId).text('File upload has been aborted. Oh no!');
  };

  var displayCompletion = function(path) {
    var link = $('<a></a>');
    link.attr('href', path);
    link.text('Uploaded to here.');
    $(pathId).append(link);
  };

  var displayUnknownProgress = function() {
    $(progressId).text('Unable to retrieve upload progress.');
  };

  return {
    displayProgress: displayProgress,
    displayError: displayError,
    displayAbortion: displayAbortion,
    displayCompletion: displayCompletion,
    displayUnknownProgress: displayUnknownProgress
  };
}
