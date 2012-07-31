var fallbackUploader = function(iframe, tracker) {
  var iframeContent = function() {
    return iframe.contents().find('body').text();
  };

  var uploadComplete = function(interval) {
    var response = iframeContent();
    tracker.uploadComplete(response);
    clearInterval(interval);
  };

  var upload = function(form) {
    var interval = setInterval(tracker.checkProgress, 2000);
    iframe.load = function() { uploadDone(interval); };
    form.submit();
  };

  return {
    uploadComplete: uploadComplete,
    upload: upload
  };
};
