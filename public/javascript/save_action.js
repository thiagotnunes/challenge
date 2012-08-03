var saveAction = function(view) {
  var save = function() {
    var form = view.form();
    var file = view.file();

    file.val('');
    file.replaceWith(file.clone(true));
    form.submit();
  };

  return {
    save: save
  };
};
