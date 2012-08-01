var commandFactory = function(html5, fallback) {
  var isVersion2 = function(xhr) {
    return xhr && ('upload' in xhr) && ('onprogress' in xhr.upload); 
  };

  var command = function() {
    if (isVersion2(new XMLHttpRequest())) { 
      return html5;
    }
    return fallback;
  };

  return {
    command: command
  };
};
