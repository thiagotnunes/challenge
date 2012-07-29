module.exports = function(filesParser) {
  var parse = function(error, fields, files) {
    res.json(filesParser.first(files));
  };

  var handle = function(form, req, res) {
    form.parse(req, parse);
  };

  return {
    handle: handle
  };
};
