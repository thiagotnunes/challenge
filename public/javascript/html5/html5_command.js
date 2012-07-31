var html5Command = function(url) {
  var execute = function() {
    var view = uploadView('progress');
    var parser = html5EventParser(view);
    var binder = html5EventBinder(parser);
    var factory = html5FormDataFactory();
    var uploader = html5Uploader(binder, factory);
    $('#file').on('change', function() {
      uploader.upload("superUploadForm", url);
    });
  };

  return {
    execute: execute
  };
}
