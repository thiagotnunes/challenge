var html5FormDataFactory = function() {
  var from = function(form) {
    return new FormData(form[0]);
  };

  return {
    from: from
  };
};
