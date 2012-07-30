var html5Uploader = function(binder) {
  var formDataFrom = function(formId) {
    return new FormData($('#' + formId)[0]);
  };

  var upload = function(formId, url) {
    var xhr = new XMLHttpRequest();
    binder.bindEventsTo(xhr);

    xhr.open("POST", url);
    xhr.send(formDataFrom(formId));
  };

  return {
    formDataFrom: formDataFrom,
    upload: upload
  };
};
