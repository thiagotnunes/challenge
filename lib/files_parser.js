module.exports = function(basePath) {
  var first = function(files) {
    var key = Object.keys(files)[0];
    var fullPath = files[key]['path'];
    var tempName = fullPath.slice(fullPath.lastIndexOf('/') + 1);
    var name = files[key]['name'];
    return {
      name: name,
      path: basePath + '/' + tempName
    };
  };

  return {
    first: first
  };
};
