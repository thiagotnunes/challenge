describe('Uploads dao', function() {
  var dao;

  beforeEach(function() {
    dao = require('../../lib/uploads_dao.js')();
  });

  it('should create an upload with the given information', function() {
    dao.create('101', { path: 'this is the file path' });

    expect(dao.find('101').path).to.equal('this is the file path');
  });

  it('should update an upload with the given attributes', function() {
    dao.create('101', { path: 'this is the file path'});

    dao.update('101', { description: 'this is the description' });

    expect(dao.find('101').description).to.equal('this is the description');
  });
});
