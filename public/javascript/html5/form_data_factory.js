var formDataFactory = function() {
  var from = function(formId) {
    return new FormData($('#' + formId)[0]);
  };

  return {
    from: from
  };
};
