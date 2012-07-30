var path = '../../lib/uploads_parser';

describe('Uploads parser', function() {
  var form = {
    parse: function() {},
    on: function() {}
  };
  var uploadDir;
  var filesParser;
  var uploadsParser;

  describe('Setting the upload dir', function() {
    beforeEach(function() {
      uploadDir = 'uploadDir';
      uploadsParser = require(path)(uploadDir);
    });

    it('should set the uploads directory', function() {
      uploadsParser.handle(form);

      form.uploadDir.should.be.equal(uploadDir);
    });
  });

  describe('Parsing the form', function() {
    var files;
    var parsedFile = { path: "path" };

    beforeEach(function() {
      files = sinon.stub();
      filesParser = {
        first: sinon.stub().withArgs(files).returns(parsedFile)
      };
      uploadsParser = require(path)(uploadDir, filesParser);
    });

    it('should parse the form', function() {
      var parse = sinon.spy(form, "parse");
      var req = sinon.stub();

      uploadsParser.handle(form, req);

      parse.calledWith(req, sinon.match.any).should.be.ok;
    });

    it('should return a json response with the parsed form', function() {
      var res = {
        contentType: function() {},
        send: function() {}
      };
      var mockedRes = sinon.mock(res);
      mockedRes.expects("contentType").withArgs("text/plain");
      mockedRes.expects("send").withArgs(JSON.stringify(parsedFile));

      uploadsParser.parse(null, null, files, res);

      mockedRes.verify();
    });
  });

  describe('Binding the progress', function() {
    var tracker;

    beforeEach(function() {
      tracker = {
        setProgress: function() {}
      };
      uploadsParser = require(path)(uploadDir, filesParser, tracker);
    });

    it('should bind to the progress event', function() {
      var on = sinon.spy(form, "on");

      uploadsParser.handle(form);

      on.calledWith('progress', sinon.match.any).should.be.ok;
    });

    it('should update the percentage for the given file', function() {
      var req = {
        params: {
          fileUuid: 101
        }
      };
      var setProgress = sinon.spy(tracker, "setProgress");

      uploadsParser.updatePercentage(10, 100, req);

      setProgress.calledWith(101, 10).should.be.ok;
    });
  });
});
