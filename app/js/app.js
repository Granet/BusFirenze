window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  (function ($) {
    var textValue = document.getElementById('searchText');
    
    $('form').on('submit', function (e) {
      if(!textValue.value){
        e.preventDefault();
      }
      window.localStorage.setItem('searchText', textValue.value);
    });
  })(jQuery);
});