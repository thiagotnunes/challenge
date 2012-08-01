module.exports = function(response, filesParser) {
  var parse = function(error, fields, files) {
    // I have to set content type to plain so IE does not try to download it. The things IE makes me do!
    response.contentType('text/plain');
    response.send(JSON.stringify(filesParser.first(files)));
  };

  return {
    parse: parse
  };
};
