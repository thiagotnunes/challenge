module.exports = function(fileUuid, dao) {
  var trackProgress = function(bytesReceived, bytesExpected) {
    var progress = bytesReceived * 100 / bytesExpected;
    dao.setProgress(fileUuid, progress);
  };

  return {
    trackProgress: trackProgress
  };
};
