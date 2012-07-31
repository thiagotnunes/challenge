var fallbackCommand = function(progressUrl, ids) {
  var fetchIFrame = function() {
    var builder = iframeBuilder();
    var iframe = builder.hiddenFrame('hidden_frame');
    iframe.appendTo('body');
    return iframe;
  };

  var execute = function() {
    var view = uploadView(ids.progress);
    var iframe = fetchIFrame();
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
