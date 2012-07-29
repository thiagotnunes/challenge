describe('Uploads parser', function() {
  var form = {
    parse: function() {},
    on: function() {}
  };
  var uploadDir = 'uploadDir';
  var uploadsParser;

  beforeEach(function() {
    uploadsParser = require('../lib/uploads_parser')(uploadDir);
  });

  it('should set the uploads directory', function() {
    uploadsParser.handle(form);

    form.uploadDir.should.be.equal(uploadDir);
  });

  it('should parse the form', function() {
    var parse = sinon.spy(form, "parse");
    var req = sinon.stub();

    uploadsParser.handle(form, req);

    parse.calledWith(req, sinon.match.any).should.be.ok;
  });

  it('should bind to the progress event', function() {
    var on = sinon.spy(form, "on");

    uploadsParser.handle(form);

    on.calledWith('progress', sinon.match.any).should.be.ok;
  });
});
