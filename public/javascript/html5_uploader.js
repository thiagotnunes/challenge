var html5Uploader = function(binder, formData) {
  var upload = function(formId, url) {
    var xhr = new XMLHttpRequest();
    binder.bindEventsTo(xhr);

    xhr.open("POST", url);
    xhr.send(formData.from(formId));
  };

  return {
    upload: upload
  };
};
