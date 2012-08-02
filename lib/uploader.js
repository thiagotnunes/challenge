module.exports = function(formParser) {
  var process = function(form, request) {
    form.parse(request, formParser.parse);
  };

  var processAndTrackProgress = function(form, request, tracker) {
    form.on('progress', tracker.trackProgress);
    process(form, request);
  };

  return {
    process: process,
    processAndTrackProgress: processAndTrackProgress
  };
};
