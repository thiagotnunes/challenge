module.exports = function(id, dao) {
  var trackProgress = function(bytesReceived, bytesExpected) {
    var progress = bytesReceived * 100 / bytesExpected;
    dao.setProgress(id, progress);
  };

  return {
    trackProgress: trackProgress
  };
};
