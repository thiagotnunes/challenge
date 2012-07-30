var html5Command = function(url) {
  var execute = function() {
    var tracker = html5UploadTracker('progress');
    var binder = html5EventBinder(tracker);
    var formData = formDataFactory();
    var uploader = html5Uploader(binder, formData);
    $('#file').on('change', function() {
      uploader.upload("superUpload", url);
    });
  };

  return {
    execute: execute
  };
}
