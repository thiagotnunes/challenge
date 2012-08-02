describe('Upload Parser', function() {
  var basePath = '/public/uploads';
  var parser;

  beforeEach(function() {
    parser = require('../../lib/files_parser')(basePath);
  });

  it('should retrieve the file path with the base path and the name from the files', function() {
    var files = {
      fileName: {
        name: 'this is the name',
        path: 'the given path'
      }
    };
    var file = parser.first(files);
    expect(file['name']).to.equal('this is the name');
    expect(file['path']).to.equal('/public/uploads/the given path');
  });

});
