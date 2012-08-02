describe('Save action', function () {
  it('should clear the file field and then submit the form', function () {
    var view = {
      form: function() {},
      file: function() {}
    };
    var file = {
      val: sinon.spy()
    };
    var form = {
      submit: sinon.spy()
    };
    sinon.stub(view, "form").returns(form);
    sinon.stub(view, "file").returns(file);

    var action = saveAction(view);

    action.save();

    expect(file.val.calledWith('')).toBeTruthy();
  });
});

