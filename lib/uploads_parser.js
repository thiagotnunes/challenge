module.exports = function(uploadDir, filesParser) {
  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.parse(req, function(error, fields, files) {
      res.json(filesParser.first(files));
    });
  };

  return {
    handle: handle
  };
};
