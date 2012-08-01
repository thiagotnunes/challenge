module.exports = function(formParser, tracker) {

  var process = function(form, req, res) {
    form.on('progress', tracker.trackProgress);
    form.parse(req, formParser.parse);
  };

  return {
    process: process
  };
};
