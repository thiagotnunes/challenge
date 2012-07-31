var html5Command = function(uploadUrl, view) {
  var execute = function() {
    var listener = html5EventListener(view);
    var binder = html5EventBinder(listener);
    var factory = html5FormDataFactory();
    var uploader = html5Uploader(binder, factory);
    view.file().on('change', function() {
      view.clearUploadedData();
      uploader.upload(view.form(), uploadUrl);
    });
  };

  return {
    execute: execute
  };
}
