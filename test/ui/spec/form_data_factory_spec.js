describe('FormData', function () {
  var factory;

  beforeEach(function () {
    factory = formDataFactory();
  });

  afterEach(function() {
    $('#fixtures').text('');
  });

  it('should create the formdata using the form', function() {
    var form = $('<form id="form"></form>');
    form.appendTo($('#fixtures'));
    
    FormData = sinon.spy();

    factory.from("form");

    expect(FormData.calledWithNew()).toBeTruthy();
    expect(FormData.calledWith(form[0])).toBeTruthy();
  });
});

