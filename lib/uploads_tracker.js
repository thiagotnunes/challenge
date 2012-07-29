module.exports = function() {
  var progresses = {};

  var setProgress = function(file, percentage) {
    progresses[file] = percentage.toFixed(0).toString();
  };

  var progressFor = function(file) {
    return progresses[file];
  };

  return {
    setProgress: setProgress,
    progressFor: progressFor
  };
};
