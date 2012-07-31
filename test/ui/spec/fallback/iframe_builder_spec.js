describe('IFrame Builder', function () {
  var builder;

  beforeEach(function () {
    builder = iframeBuilder();
  });

  it('should build a hidden iframe with the given id', function () {
    var callback = function() {};
    var iframe = builder.hiddenFrame('frameId');

    expect(iframe.attr('id')).toBe('frameId');
    expect(iframe.attr('name')).toBe('frameId');
    expect(iframe.attr('style')).toBe('display: none;');
  });
});

