var basePath = '/public/uploads';
var parser = require('../lib/upload_parser').uploadParser(basePath);

describe('Upload Parser', function() {

  it('should retrieve the file path with the base path from the files', function() {
    var files = {
      fileName: {
        path: 'the given path'
      }
    };
    var file = parser.parse(files);
    file['path'].should.equal('/public/uploads/the given path');
  });

  it('should retrieve the file path with the base path from the files with null file names', function() {
    var files = {
      null: {
        path: 'the given path'
      }
    };
    var file = parser.parse(files);
    file['path'].should.equal('/public/uploads/the given path');
  });

});
