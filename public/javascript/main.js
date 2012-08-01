$(function() {
  var view = uploadView({
    progress: 'progress',
      file: 'file',
      form: 'superUploadForm',
      uploadPath: 'path',
      iframe: 'hidden_frame'
  });
  var html5 = html5Command(uploadUrl, view);
  var fallback = fallbackCommand(progressUrl, view);
  var factory = commandFactory(html5, fallback);
  //factory.command().execute();
  fallback.execute();
});
