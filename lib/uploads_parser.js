module.exports = function(uploadDir, filesParser, tracker) {

  var parse = function(error, fields, files, res) {
    // I have to set content type to plain so IE does not try to download it. The things IE makes me do!
    res.contentType('text/plain');
    res.send(JSON.stringify(filesParser.first(files)));
  };

  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.on('progress', tracker.trackProgress);
    form.parse(req, function(error, fields, files) {
      parse(error, fields, files, res);
    });
  };

  return {
    handle: handle,
    parse: parse
  };
};
