describe('Form validator', function() {
  var dao;
  var validator;

  beforeEach(function() {
    dao = {
      find: function() {}
    };

    validator = require('../../lib/form_validator')(dao); 
  });

  describe('Invalid id', function() {

    it('should not be valid when no id is provided', function() {
      var id = undefined;

      expect(validator.validate(id, 'desc')).not.to.be.ok;
    });

    it('should not be valid when id is empty', function() {
      var id = '';

      expect(validator.validate(id, 'desc')).not.to.be.ok;
    });

    it('should not be valid when no file was uploaded', function() {
      var id = 'not existing';

      expect(validator.validate(id, 'desc')).not.to.be.ok;
    });

  });

  describe('Invalid description', function() {
    var id;

    beforeEach(function() {
      id = '101';
      sinon.stub(dao, "find").withArgs(id).returns({});
    });

    it('should not be valid when no description is provided', function() {
      var fields = {};

      expect(validator.validate(id, fields)).not.to.be.ok;
    });

    it('should not be valid when description is empty', function() {
      var fields = {
        description: ''
      };

      expect(validator.validate(id, fields)).not.to.be.ok;
    });

  });

  describe('Valid id and description', function() {

    it('should be valid when id and description are provided', function() {
      var id = '101';
      var fields = {
        description: 'description of the upload'
      };
      sinon.stub(dao, "find").withArgs(id).returns({});

      expect(validator.validate(id, fields)).to.be.ok;
    });

  });
});
