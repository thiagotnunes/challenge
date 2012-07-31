var fallbackCommand = function(progressUrl, view) {
  var execute = function() {
    var iframe = $('#' + ids.iframe);
    var tracker = fallbackProgressTracker(progressUrl, view);
    var uploader = fallbackUploader(iframe, tracker);
    var form = $('#' + ids.form);
    form.attr('target', iframe.attr('id'));
    $('#' + ids.file).on('change', function() {
      uploader.upload(form);
    });
  };

  return {
    execute: execute
  };
};
