module.exports = function(uploadDir, formParser, tracker) {

  var handle = function(form, req, res) {
    form.uploadDir = uploadDir;
    form.on('progress', tracker.trackProgress);
    form.parse(req, formParser.parse);
  };

  return {
    handle: handle
  };
};
