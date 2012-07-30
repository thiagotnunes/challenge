var html5EventBinder = function(listener) {
  var bindEventsTo = function(xhr) {
    xhr.upload.addEventListener("progress", listener.progress);
    xhr.addEventListener("load", listener.load);
    xhr.addEventListener("error", listener.error);
    xhr.addEventListener("abort", listener.abort);
  };

  return {
    bindEventsTo: bindEventsTo
  };
};
