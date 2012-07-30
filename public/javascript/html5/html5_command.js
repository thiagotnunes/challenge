var html5Command = function(url) {
  var execute = function() {
    var view = uploadView('progress');
    var listener = html5EventListener(view);
    var binder = html5EventBinder(listener);
    var formData = formDataFactory();
    var uploader = html5Uploader(binder, formData);
    $('#file').on('change', function() {
      uploader.upload("superUploadForm", url);
    });
  };

  return {
    execute: execute
  };
}
