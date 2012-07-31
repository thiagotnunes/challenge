var fallbackCommand = function(progressUrl) {
  var execute = function() {
    var view = uploadView('progress');
    var builder = iframeBuilder();
    var iframe = builder.hiddenFrame('hidden_frame');
    iframe.appendTo('body');
    var tracker = fallbackProgressTracker(progressUrl, view);
    var uploader = fallbackUploader(iframe, tracker);
    var form = $('#superUploadForm');
    form.attr('target', iframe.attr('id'));
    $('#file').on('change', function() {
      uploader.upload(form);
    });
  };

  return {
    execute: execute
  };
};
