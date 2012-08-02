module.exports = function(callback, filesParser) {
  var parse = function(error, fields, files) {
    var file = filesParser.first(files);
    callback(file, fields);
  };

  return {
    parse: parse
  };
};
