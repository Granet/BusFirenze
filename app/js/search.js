window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  (function ($) {
    var bus = new BusModel();
    listPresenter({
      el: 'section#search',
      model: bus,
    });
    var searchText = window.localStorage.getItem('searchText');

    bus.info(sanitize(searchText));

    function sanitize (str) {
      return str.replace(/à/, 'a\'').replace(/è/, 'e\'').replace(/ì/, 'i\'').replace(/ò/, 'o\'').replace(/ù/, 'u\'');
    }
  })(jQuery);
});