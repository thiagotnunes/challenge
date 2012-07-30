  <script type="text/javascript">
    function uploadDone() {
      var frame = $('#hiddenUpload');
      var content = frame.contents().find('body').text();
      if (content) {
        var response = $.parseJSON(content);
        var link = $('<a></a>');
        link.attr('href', response.path);
        link.text('Uploaded to here');
        link.appendTo($('#progress'));
        clearInterval(int);
      }
    };

    function upload() {
      var form = $('#superUpload');
      form.submit();

      int = setInterval(function() { progress(int); }, 2000);
    }

    function progress() {
      alert('Progress');
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/progress/<%= fileUuid %>");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var file = $.parseJSON(xhr.responseText);
          var text = $('#progress').text();
          $('#progress').text(file.progress + '%');
        }
      };
      xhr.send(null);
    }

    $(function() {
        $('#file').on('change', upload);
    });
  </script>

  <iframe id="hiddenUpload" name="hiddenUpload" onload="uploadDone();" style="display: none;"/>
