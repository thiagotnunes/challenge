var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var uploadsParser = require('../lib/uploads_parser')();

describe('Uploads parser', function() {

  it('should parse', function() {
  });

  it('should parse the form', function() {
    var form = {
      parse: function() {}
    };
    var parse = sinon.spy(form, "parse");
    var req = sinon.stub();
    var res = sinon.stub();

    uploadsParser.handle(form, req, res);

    expect(parse.calledWith(req, sinon.match.any)).to.be.ok;
  });
});
