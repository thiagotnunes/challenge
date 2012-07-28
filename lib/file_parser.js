exports.parse = function(files) {
  var key = Object.keys(files)[0];
  var fullPath = files[key]['path'];
  var name = fullPath.slice(fullPath.lastIndexOf('/') + 1);
  return {
    path: name
  };
};