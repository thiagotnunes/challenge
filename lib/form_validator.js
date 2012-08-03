module.exports = function(dao) {
  var validateId = function(id) {
    if(id) {
      return !!dao.find(id);
    }

    return false;
  };

  var validateDescription = function(fields) {
    return !!fields.description;
  };

  var validate = function(id, fields) {
    return validateId(id) && validateDescription(fields);
  };

  return {
    validate: validate
  };
};
