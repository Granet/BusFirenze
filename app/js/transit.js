window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  (function ($) {
    var bus = new BusModel();

    detailsPresenter({
      el: 'section#details',
      model: bus
    });
    
    bus.schedule(JSON.parse(window.localStorage.getItem('fermata')));

  })(jQuery);
});