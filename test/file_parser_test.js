var parser = require('../lib/file_parser');

describe('File Parser', function() {

  it('should retrieve the file path from the files', function() {
    var files = {
      fileName: {
        path: 'the given path'
      }
    };
    var file = parser.parse(files);
    file['path'].should.equal('the given path');
  });

});
