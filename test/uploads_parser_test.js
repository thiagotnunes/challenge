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
      uploadsParser = require('../lib/uploads_parser')(uploadDir);
    });

    it('should set the uploads directory', function() {
      uploadsParser.handle(form);

      form.uploadDir.should.be.equal(uploadDir);
    });
  });

  describe('Parsing the form', function() {
    var files;

    beforeEach(function() {
      files = sinon.stub();
      filesParser = {
        first: sinon.stub().withArgs(files).returns("parsedFile")
      };
      uploadsParser = require('../lib/uploads_parser')(uploadDir, filesParser);
    });

    it('should parse the form', function() {
      var parse = sinon.spy(form, "parse");
      var req = sinon.stub();

      uploadsParser.handle(form, req);

      parse.calledWith(req, sinon.match.any).should.be.ok;
    });

    it('should return a json response with the parsed form', function() {
      var res = {
        json: function() {}
      };
      var json = sinon.spy(res, "json");

      uploadsParser.parse(null, null, files, res);

      json.calledWith("parsedFile").should.be.ok;
    });
  });

  describe('Binding the progress', function() {
    var tracker;

    beforeEach(function() {
      tracker = {
        setProgress: function() {}
      };
      uploadsParser = require('../lib/uploads_parser')(uploadDir, filesParser, tracker);
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
