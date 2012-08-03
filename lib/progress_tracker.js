module.exports = function(id, progresses) {
  var trackProgress = function(bytesReceived, bytesExpected) {
    var progress = bytesReceived * 100 / bytesExpected;
    alert("Tracking progress : " + progress);
    progresses.setProgress(id, progress);
  };

  return {
    trackProgress: trackProgress
  };
};
