function listPresenter(options) {
  'use strict';
  var el = options.el;
  var model = options.model;

  function listResult(data) {
    // display bus stop in a list
    $('#listInfo').empty();
    console.log('Received list of stops');
    if (data) {
      var frag = document.createDocumentFragment();

      data.forEach(function (stopData) {
        var li = document.createElement('li');
        li.innerHTML = App.templates.fermata(stopData);
        li.addEventListener('click', function (e) {
          e.preventDefault();
          model.stopTransit(stopData);
          document.getElementById('detailsTitle').text = stopData.n;
        });
        frag.appendChild(li);
      });

      var a = document.getElementById('listInfo');
      a.appendChild(frag);
    } else {
      $('#listInfo').text('Nessuna fermata trovata con questo nome');
    }
    
  }

  model.on('info', listResult);
}