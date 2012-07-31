var fallbackProgressTracker = function(view) {

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

  var checkProgressOn = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
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
    checkProgressOn: checkProgressOn
  };
};
