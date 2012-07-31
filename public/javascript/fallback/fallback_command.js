var fallbackCommand = function(progressUrl, ids) {
  var execute = function() {
    var view = uploadView(ids.progress, ids.uploadPath);
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
