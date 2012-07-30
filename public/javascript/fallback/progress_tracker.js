var fallbackProgressTracker = function(uploadTracker) {

  var isReady = function(xhr) {
    return xhr.readyState === 4;
  };

  var isSuccessful = function(xhr) {
    return xhr.status === 200;
  };

  var checkProgressOn = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
      if (isReady(xhr)) {
        if (isSuccessful(xhr)) {
          uploadTracker.displayProgress(xhr);
        } else {
          uploadTracker.displayError();
        }
      }
    };
    xhr.send(null);
  };

  return {
    checkProgressOn: checkProgressOn
  };
};
