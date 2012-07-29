module.exports = function(uploadDir, filesParser) {
  var parse = function(error, fields, files, res) {
    res.json(filesParser.first(files));
  };

  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.on('progress', function(bytesReceived, bytesExpected) {
    });
    form.parse(req, function(error, fields, files) {
      parse(error, fields, files, res);
    });
  };

  return {
    handle: handle,
    parse: parse
  };
};
