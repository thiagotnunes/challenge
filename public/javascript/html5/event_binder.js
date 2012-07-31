var html5EventBinder = function(parser) {
  var bindEventsTo = function(xhr) {
    xhr.upload.addEventListener("progress", parser.progress);
    xhr.addEventListener("load", parser.load);
    xhr.addEventListener("error", parser.error);
    xhr.addEventListener("abort", parser.abort);
  };

  return {
    bindEventsTo: bindEventsTo
  };
};
