var html5Uploader = function(binder, factory) {
  var upload = function(formId, url) {
    var xhr = new XMLHttpRequest();
    binder.bindEventsTo(xhr);

    xhr.open("POST", url);
    xhr.send(factory.from(formId));
  };

  return {
    upload: upload
  };
};
