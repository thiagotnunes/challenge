var fallbackCommand = function(uploadUrl, progressUrl, view) {
  var execute = function() {
    var iframe = view.iframe();
    var tracker = fallbackProgressTracker(progressUrl, view);
    var uploader = fallbackUploader(iframe, tracker);
    var form = view.form();
    view.file().on('change', function() {
      view.clearUploadedData();
      uploader.upload(form, uploadUrl);
    });
  };

  return {
    execute: execute
  };
};
