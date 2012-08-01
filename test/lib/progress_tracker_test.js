describe('Progress tracker', function() {
  var progresses;
  var tracker;

  beforeEach(function() {
    progresses = {
      setProgress: function() {}
    };
  });

  it('should track the progress for the given id', function() {
    tracker = require('../../lib/progress_tracker.js')('id', progresses);

    var bytesReceived = 10;
    var bytesExpected = 50;
    var mockDao = sinon.mock(progresses);
    mockDao.expects("setProgress").withArgs('id', 20);

    tracker.trackProgress(bytesReceived, bytesExpected);
    
    mockDao.verify();
  });
});
