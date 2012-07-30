var html5FormDataFactory = function() {
  var from = function(formId) {
    return new FormData($('#' + formId)[0]);
  };

  return {
    from: from
  };
};
