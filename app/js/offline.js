window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  (function ($) {
    var bus = new BusModel();

    searchPresenter({
      el: 'section#offline',
      model: bus,
    });

  })(jQuery);
});