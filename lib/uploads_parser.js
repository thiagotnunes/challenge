module.exports = function(uploadDir, filesParser, uploadsTracker) {
  var parse = function(error, fields, files, res) {
    res.json(JSON.stringify(filesParser.first(files)));
  };

  var updatePercentage = function(bytesReceived, bytesExpected, req) {
    var percentage = bytesReceived * 100 / bytesExpected;
    uploadsTracker.setProgress(req.params.fileUuid, percentage);
  };

  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.on('progress', function(bytesReceived, bytesExpected) {
      updatePercentage(bytesReceived, bytesExpected, req);
    });
    form.parse(req, function(error, fields, files) {
      parse(error, fields, files, res);
    });
  };

  return {
    handle: handle,
    parse: parse,
    updatePercentage: updatePercentage
  };
};
