module.exports = function(id, progresses) {
  var trackProgress = function(bytesReceived, bytesExpected) {
    var progress = bytesReceived * 100 / bytesExpected;
    progresses.setProgress(id, progress);
  };

  return {
    trackProgress: trackProgress
  };
};
