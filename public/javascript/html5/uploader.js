var html5Uploader = function(binder, formData) {
  var upload = function(form, url) {
    var xhr = new XMLHttpRequest();
    binder.bindEventsTo(xhr);

    xhr.open("POST", url);
    xhr.send(formData.from(form));
  };

  return {
    upload: upload
  };
};
