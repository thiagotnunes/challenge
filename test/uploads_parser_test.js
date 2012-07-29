var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var uploadDir = 'uploadDir';
var uploadsParser = require('../lib/uploads_parser')(uploadDir);

describe('Uploads parser', function() {

  it('should set the uploads directory', function() {
    var form = {
      parse: function() {},
      on: function() {}
    };

    uploadsParser.handle(form);

    form.uploadDir.should.be.equal(uploadDir);
  });

  it('should parse the form', function() {
    var form = {
      parse: function() {},
      on: function() {}
    };
    var parse = sinon.spy(form, "parse");
    var req = sinon.stub();
    var res = sinon.stub();

    uploadsParser.handle(form, req);

    parse.calledWith(req, sinon.match.any).should.be.ok;
  });

  it('should bind to the progress event', function() {
    var form = {
      parse: function() {},
      on: function() {}
    };
    var on = sinon.spy(form, "on");

    uploadsParser.handle(form);

    on.calledWith('progress', sinon.match.any).should.be.ok;
  });
});
