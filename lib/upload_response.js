module.exports = function(id, response, dao, validator) {

  var uploadCallback = function(file, fields) {
    dao.create(id, file);
    // I have to set content type to plain so IE does not try to download it. The things IE makes me do!
    response.contentType('text/plain');
    response.send(JSON.stringify(file));
  };
  
  var saveCallback = function(file, fields) {
    var valid = validator.validate(id, fields);
    if (valid) {
      dao.update(id, fields);
      response.render("show", { upload: dao.find(id) });
    } else {
      response.render("index", { id: id, error: 'Please make sure you upload a file and then add a description before saving the upload' });
    }
  };

  return {
    uploadCallback: uploadCallback,
    saveCallback: saveCallback
  };
};
