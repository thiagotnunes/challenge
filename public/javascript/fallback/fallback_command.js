var fallbackCommand = function(progressUrl, view) {
  var execute = function() {
    var iframe = view.iframe();
    var tracker = fallbackProgressTracker(progressUrl, view);
    var uploader = fallbackUploader(iframe, tracker);
    var form = view.form();
    form.attr('target', iframe.attr('id'));
    view.file().on('change', function() {
      uploader.upload(form);
    });
  };

  return {
    execute: execute
  };
};
