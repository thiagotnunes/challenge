describe('Save action', function () {
  it('should clear the file field and then submit the form', function () {
    var view = {
      form: function() {},
      file: function() {}
    };
    var file = {
      replaceWith: sinon.spy(),
      clone: function() {} 
    };
    var form = {
      submit: sinon.spy()
    };
    var cloned = {};
    sinon.stub(view, "form").returns(form);
    sinon.stub(view, "file").returns(file);
    sinon.stub(file, "clone").returns(cloned);

    var action = saveAction(view);

    action.save();

    expect(file.replaceWith.calledWith(cloned)).toBeTruthy();
  });
});

