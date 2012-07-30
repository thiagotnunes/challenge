var iframeBuilder = function() {
  var build = function(id, onLoad) {
    var frame = $('<iframe />');
    frame.attr('id', id);
    frame.attr('name', id);
    frame.on('load', onLoad);

    return frame;
  };

  return {
    build: build
  };
};
