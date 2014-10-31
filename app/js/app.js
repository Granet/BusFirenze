window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  (function ($) {
    var bus = new BusModel();

    searchPresenter({
      el: 'section#home',
      model: bus,
      nextRoute: '#list'
    });
    listPresenter({
      el: 'section#list',
      model: bus,
      nextRoute: 'details'
    });
    detailsPresenter({
      el: 'section#details',
      model: bus,
      previousRoute: 'list'
    });

    $('body').on('click', 'a', function (e) {
      e.preventDefault();
      var link = $(this);
      riot.route(link.attr('href'));
      console.log(link.attr('href'));
    });

    riot.route(function (path) {
      var a = document.querySelectorAll('section[role=region]');
      for (var i = a.length - 1; i >= 0; i--) {
        a[i].hidden = true;
      }
      document.querySelector('section' + path).hidden = false;
    });

  })(jQuery);
});