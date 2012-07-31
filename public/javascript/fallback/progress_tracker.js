var fallbackProgressTracker = function(parser) {

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
          parser.progress(xhr);
        } else {
          parser.error();
        }
      }
    };
    xhr.send(null);
  };

  return {
    checkProgressOn: checkProgressOn
  };
};
