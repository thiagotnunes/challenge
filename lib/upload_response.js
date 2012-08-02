module.exports = function(id, response, dao) {

  var uploadCallback = function(file, fields) {
    dao.create(id, file);
    // I have to set content type to plain so IE does not try to download it. The things IE makes me do!
    response.contentType('text/plain');
    response.send(JSON.stringify(file));
  };
  
  var saveCallback = function(file, fields) {
    console.log(fields);
    dao.update(id, fields);
  };

  return {
    uploadCallback: uploadCallback,
    saveCallback: saveCallback
  };
};
