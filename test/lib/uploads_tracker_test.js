describe('Uploads tracker', function() {

  var tracker;

  beforeEach(function() {
    tracker = require('../../lib/uploads_tracker.js')();
  });

  it('should retrieve the percentage of a given file', function() {
    var file = "fileId";
    var percentage = 25.54674;
    tracker.setProgress(file, percentage);

    tracker.progressFor(file).should.be.equal("26");
  });

  it('should return undefined for a percentage of a file that is not in progress', function() {
    var file = "unknown file";
    expect(tracker.progressFor(file) === undefined).to.be.ok;
  });
});
