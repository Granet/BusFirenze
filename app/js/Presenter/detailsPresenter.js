function detailsPresenter(options) {
  'use strict';
  var el = options.el;
  var model = options.model;

  function listTransit(data) {
    document.querySelector('#resultInfo').innerHTML = '';
    console.log('Received list of transit: ' + data.length + ' items');
    if (data) {
      var a = document.getElementById('resultInfo');
      var frag = document.createDocumentFragment();
      data.forEach(function (transitData) {
        var today = new Date();
        var fix = 2 * 60 * 60 * 1000;
        //se the clock to 00:00:00.0 and add the number of millisecond returned
        today.setHours(0, 0, 0, +transitData.d + fix);

        transitData.h = today.getHours();
        transitData.m = today.getMinutes();
        console.log(transitData);
        var li = document.createElement('li');
        li.innerHTML = App.templates.transit(transitData);
        frag.appendChild(li);
      });
      
      a.appendChild(frag);
    } else {
      //
    }
  }


  model.on('transit', listTransit);
}