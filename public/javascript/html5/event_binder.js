var html5EventBinder = function(tracker) {
  var bindEventsTo = function(xhr) {
    xhr.upload.addEventListener("progress", tracker.displayProgress);
    xhr.addEventListener("load", tracker.displayCompletion);
    xhr.addEventListener("error", tracker.displayError);
    xhr.addEventListener("abort", tracker.displayAbortion);
  };

  return {
    bindEventsTo: bindEventsTo
  };
};
