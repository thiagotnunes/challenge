var html5Uploader = function(tracker) {
  var bindEventsTo = function(xhr) {
    xhr.upload.addEventListener("progress", tracker.displayProgress);
    xhr.addEventListener("load", tracker.displayCompletion);
    xhr.addEventListener("error", tracker.displayError);
    xhr.addEventListener("abort", tracker.displayAbortion);
  };

  var formDataFrom = function(formId) {
    return new FormData($('#' + formId)[0]);
  };

  var upload = function(formId, url) {
    var xhr = new XMLHttpRequest();
    bindEventsTo(xhr);

    xhr.open("POST", url);
    xhr.send(formDataFrom(formId));
  };

  return {
    bindEventsTo: bindEventsTo,
    formDataFrom: formDataFrom,
    upload: upload
  };
};
