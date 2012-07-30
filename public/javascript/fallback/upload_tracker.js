var fallbackUploadTracker = function(progressId) {
  var progressElement = '#' + progressId;

  var displayProgress = function(xhr) {
    var file = $.parseJSON(xhr.responseText);
    $(progressElement).text(file.progress + '%');
  };

  var displayError = function() {
    $(progressElement).text('There was an error attempting to upload the file, please try again.');
  };

  var displayCompletion = function(xhr) {
    var file = $.parseJSON(xhr.responseText);
    var link = $('<a/>');
    link.attr('id', 'uploadedTo');
    link.attr('href', file.path);
    link.text('Uploaded to here.');
    $(progressElement).append(link);
  };

  return {
    displayProgress: displayProgress,
    displayError: displayError,
    displayCompletion: displayCompletion
  };
};
