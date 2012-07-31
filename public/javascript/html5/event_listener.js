var html5EventListener = function(view) {

  var progress = function(evt) {
    if (evt.lengthComputable) {
      var progress = evt.loaded * 100 / evt.total;
      view.displayProgress(progress);
    } else {
      view.displayUnknownProgress();
    }
  };

  var load = function(evt) {
    var file = $.parseJSON(evt.target.responseText);
    view.displayCompletion(file.path);
  };

  var error = function() {
    view.displayError();
  };

  var abort = function() {
    view.displayAbortion();
  };

  return {
    progress: progress,
    load: load,
    error: error,
    abort: abort
  };
}
