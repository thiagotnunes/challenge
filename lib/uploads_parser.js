module.exports = function(filesParser) {
  var handle = function(form, req, res) {
    form.parse(req, function(error, fields, files) {
      res.json(filesParser.first(files));
    });
  };

  return {
    handle: handle
  };
};
