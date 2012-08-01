module.exports = function() {
  var uploads = {};

  var create = function(id, attributes) {
    uploads[id] = attributes;
  };

  var find = function(id) {
    return uploads[id];
  };

  return {
    create: create,
    find: find
  };
};
