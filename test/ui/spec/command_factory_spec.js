describe('Command factory', function() {
  var html5;
  var fallback;
  var factory;

  beforeEach(function() {
    html5 = {};
    fallback = {};
    factory = commandFactory(html5, fallback);
  });

  it('should return the html 5 command when the browser supports XHR version 2', function() {
    var xhr = {
      upload: {
        onprogress: {}
      }
    };
    XMLHttpRequest = sinon.stub().returns(xhr);
    expect(factory.command()).toBe(html5);
  });

  it('should return the fallback command when the browser does not support XHR version 2', function() {
    var xhr = {};
    XMLHttpRequest = sinon.stub().returns(xhr);

    expect(factory.command()).toBe(fallback);
  });
});
