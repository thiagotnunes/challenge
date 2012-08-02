var saveAction = function(view) {
  var save = function() {
    var form = view.form();
    var file = view.file();

    file.val('');
    form.submit();
  };

  return {
    save: save
  };
};
