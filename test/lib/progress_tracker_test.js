describe('Progress tracker', function() {
  var dao;
  var tracker;

  beforeEach(function() {
    dao = {
      setProgress: function() {}
    };
  });

  it('should track the progress for the given id', function() {
    tracker = require('../../lib/progress_tracker.js')('id', dao);

    var bytesReceived = 10;
    var bytesExpected = 50;
    var mockDao = sinon.mock(dao);
    mockDao.expects("setProgress").withArgs('id', 20);

    tracker.trackProgress(bytesReceived, bytesExpected);
    
    mockDao.verify();
  });
});
