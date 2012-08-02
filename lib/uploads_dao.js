module.exports = function() {
  var uploads = {};

  var create = function(id, attributes) {
    uploads[id] = attributes;
  };

  var find = function(id) {
    return uploads[id];
  };

  var update = function(id, attributes) {
    var upload = find(id);
    for(var property in attributes) {
      uploads[id][property] = attributes[property];
    };
  };

  return {
    create: create,
    update: update,
    find: find
  };
};
