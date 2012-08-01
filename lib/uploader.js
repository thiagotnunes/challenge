module.exports = function(uploadDir, formParser, tracker) {

  var process = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.on('progress', tracker.trackProgress);
    form.parse(req, formParser.parse);
  };

  return {
    process: process
  };
};
