describe('Uploads dao', function() {
  var dao;

  beforeEach(function() {
    dao = require('../../lib/uploads_dao.js')();
  });

  it('should retrieve the percentage of a given file', function() {
    var file = "fileId";
    var percentage = 25.54674;
    dao.setProgress(file, percentage);

    dao.progressFor(file).should.be.equal("26");
  });

  it('should return undefined for a percentage of a file that is not in progress', function() {
    var file = "unknown file";
    expect(dao.progressFor(file) === undefined).to.be.ok;
  });
});
