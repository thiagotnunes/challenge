describe('IFrame Builder', function () {
  var builder;

  beforeEach(function () {
    builder = iframeBuilder();
  });

  it('should build an iframe with the given id and onload hook', function () {
    var callback = function() {};
    var iframe = builder.build('frameId', callback);

    expect(iframe.attr('id')).toBe('frameId');
    expect(iframe.attr('name')).toBe('frameId');
    expect(iframe.data('events').load[0].handler).toBe(callback);
  });
});

