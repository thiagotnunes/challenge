var fallbackProgressTracker = function(progressUrl, view) {

  var isReady = function(xhr) {
    return xhr.readyState === 4;
  };

  var isSuccessful = function(xhr) {
    return xhr.status === 200;
  };

  var parseResponse = function(xhr) {
    return $.parseJSON(xhr.responseText);
  };

  var handleSuccess = function(xhr) {
    var file = parseResponse(xhr);
    view.displayProgress(file.progress);
  };

  var checkProgress = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", progressUrl);
    xhr.onreadystatechange = function() {
      if (isReady(xhr)) {
        if (isSuccessful(xhr)) {
          handleSuccess(xhr);
        } else {
          view.displayError();
        }
      }
    };
    xhr.send(null);
  };

  return {
    checkProgress: checkProgress
  };
};
