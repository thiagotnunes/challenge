var html5Command = function(uploadUrl, ids) {
  var execute = function() {
    var view = uploadView(ids.progress, ids.uploadPath);
    var listener = html5EventListener(view);
    var binder = html5EventBinder(listener);
    var factory = html5FormDataFactory();
    var uploader = html5Uploader(binder, factory);
    $('#' + ids.file).on('change', function() {
      uploader.upload(ids.form, uploadUrl);
    });
  };

  return {
    execute: execute
  };
}
