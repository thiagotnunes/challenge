module.exports = function() {
  var progress = {};

  var setProgress = function(id, percentage) {
    progress[id] = percentage.toFixed(0).toString();
  };

  var progressFor = function(id) {
    return progress[id];
  };

  return {
    setProgress: setProgress,
    progressFor: progressFor
  };
};
