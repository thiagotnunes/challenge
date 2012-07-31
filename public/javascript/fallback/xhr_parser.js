var fallbackXhrParser = function(view) {
  var progress = function(xhr) {
    var file = $.parseJSON(xhr.responseText);

    view.displayProgress(file.progress);
  };

  var error = function() {
    view.displayError();
  };

  return {
    progress: progress,
    error: error
  };
};
