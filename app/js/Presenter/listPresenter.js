function listPresenter(options) {
  'use strict';
  var el = options.el;
  var model = options.model;

  function listResult(data) {
    // display bus stop in a list
    $('#listInfo').empty();
    if (data) {
      var frag = document.createDocumentFragment();
      var i = 0;
      data.forEach(function (stopData) {
        var li = document.createElement('li');
        li.innerHTML = App.templates.fermata(stopData);
        li.addEventListener('click', function (e) {
          window.localStorage.setItem('fermata', JSON.stringify(stopData));
        });
        $('#preferito').click(function(){
          window.localStorage.setItem(JSON.stringify(i), JSON.stringify(stopData));
          i++;
        });
        frag.appendChild(li);
      });

      var a = document.getElementById('listInfo');
      a.appendChild(frag);
    } else {
      $('#listInfo').html('Nessuna fermata trovata con questo nome');
    }
    
  }

  model.on('info', listResult);
}