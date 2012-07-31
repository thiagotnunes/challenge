var iframeBuilder = function() {
  var hiddenFrame = function(id) {
    var iframe = $('<iframe />');
    iframe.attr('id', id);
    iframe.attr('name', id);
    iframe.attr('style', 'display: none;');

    return iframe;
  };

  return {
    hiddenFrame: hiddenFrame
  };
};
