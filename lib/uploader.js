module.exports = function(formParser, tracker) {

  var process = function(form, req) {
    form.on('progress', tracker.trackProgress);
    form.parse(req, formParser.parse);
  };

  return {
    process: process
  };
};
