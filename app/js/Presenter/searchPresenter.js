function searchPresenter(options) {
  'use strict';
  var el = options.el;
  var model = options.model;

  $('button[type=reset]').on('click', function () {
    document.getElementById("searchForm").reset();
  });
  addEventListener('onreset', function (){
    var text = document.getElementById('searchText');
    text.value = '';
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var key = $('#searchText').val();
    model.stopInfo(key);
    riot.route(options.nextRoute);
  });
}