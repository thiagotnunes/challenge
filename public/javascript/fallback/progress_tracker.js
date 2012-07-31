var fallbackProgressTracker = function(progressUrl, view) {

  var isReady = function(xhr) {
    return xhr.readyState === 4;
  };

  var isSuccessful = function(xhr) {
    return xhr.status === 200;
  };

  var parseResponse = function(responseText) {
    return $.parseJSON(responseText);
  };

  var checkProgress = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", progressUrl);
    xhr.onreadystatechange = function() {
      if (isReady(xhr)) {
        if (isSuccessful(xhr)) {
          var file = parseResponse(xhr.responseText);
          view.displayProgress(parseFloat(file.progress));
        } else {
          view.displayError();
        }
      }
    };
    xhr.send(null);
  };

  var uploadComplete = function(responseText) {
    var file = parseResponse(responseText);
    view.displayCompletion(file.path);
  };

  return {
    checkProgress: checkProgress,
    uploadComplete: uploadComplete
  };
};
