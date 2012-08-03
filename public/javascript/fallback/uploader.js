var fallbackUploader = function(iframe, tracker) {
  var iframeContent = function() {
    return iframe.contents().find('body').text();
  };

  var uploadComplete = function(interval) {
    var response = iframeContent();
    tracker.uploadComplete(response);
    clearInterval(interval);
  };

  var submit = function(form, url) {
    var previousAction = form.attr('action');
    form.attr('action', url);
    form.submit();
    form.attr('action', previousAction);
  };

  var upload = function(form, url) {
    var interval = setInterval("tracker.checkProgress()", 2000);
    iframe.unbind();
    iframe.on('load', function() { uploadComplete(interval); });
    form.attr('target', iframe.attr('id'));
    submit(form, url);
    form.removeAttr('target');
  };

  return {
    uploadComplete: uploadComplete,
    upload: upload
  };
};
