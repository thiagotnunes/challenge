module.exports = function() {
  var progress = {};

  var setProgress = function(fileUuid, percentage) {
    progress[fileUuid] = percentage.toFixed(0).toString();
  };

  var progressFor = function(fileUuid) {
    return progress[fileUuid];
  };

  return {
    setProgress: setProgress,
    progressFor: progressFor
  };
};
