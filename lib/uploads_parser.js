module.exports = function(uploadDir, filesParser) {
  var parse = function(error, fields, files) {
    res.json(filesParser.first(files));
  };

  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.parse(req, parse);
  };

  return {
    handle: handle
  };
};
