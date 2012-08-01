describe('Progresses', function() {
  var _progresses;

  beforeEach(function() {
    _progresses = require('../../lib/progresses')();
  });

  it('should retrieve the percentage of a given file', function() {
    var id = "fileId";
    var percentage = 25.54674;
    _progresses.setProgress(id, percentage);

    expect(_progresses.progressFor(id)).to.equal("26");
  });

  it('should return undefined for a percentage of a file that is not in progress', function() {
    var id = "unknown file";

    expect(_progresses.progressFor(id) === undefined).to.be.ok;
  });
});
