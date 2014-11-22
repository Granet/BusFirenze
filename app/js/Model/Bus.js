
function BusModel() {
  'use strict';
  // Parameters hold the urls
  var Parameters = {
    base: 'http://www.temporealeataf.it/Mixer/',
    rest : 'Rest/PublicTransportService.svc',
    nearby: '/count',
    search: '/search',
    schedule: '/schedule',
    ClientTicket: 'r3x1m_ataf'
  };
  // hold info to make reequest
  var Firenze = {
    llLat: 43,
    llLon: 10,
    urLat: 44,
    urLon: 12
  };

  $.ajaxSetup({
    xhr: function () {
      return new XMLHttpRequest({
        mozSystem: true
      });
    }
  });

  // now model is capable of emitting 'events'
  var self = riot.observable(this);
  // functions to get data
  
  /*this.nearby = function () {
    var geo = navigator.geolocation;

    geo.getCurrentPosition(sendNearby);


    function sendNearby (pos){
      $.get(
        Parameters.base + Parameters.rest + Parameters.nearby,
        {
          urLat: Firenze.urLat,
          urlLon: Firenze.urLon,
          llLat: Firenze.llLat,
          llLon: Firenze.llLon,
          getDist: true,
          getId: true,
          getLine: true,
          dt: 0,
          cenLat: pos.coords.latitude,
          cenLon: pos.coords.longitude,
          mot: 1,
          s: getDynamicPassword(Parameters.ClientTicket)
        },
        function (response){
          self.trigger('nearby', response);
        });
      }
  };*/

  this.info = function (key) {
    console.log('searching ' + key);
    $.getJSON(
      Parameters.base + Parameters.rest + Parameters.search,
      {
        urLat: Firenze.urLat,
        urLon: Firenze.urLon,
        llLat: Firenze.llLat,
        llLon: Firenze.llLon,
        st: key,
        s: getDynamicPassword(Parameters.ClientTicket)
      },
      function (response) {
        self.trigger('info', response);
      }
    );
  };

  this.schedule = function (obj) {
    $.getJSON(
        Parameters.base + Parameters.rest + Parameters.schedule,
      {
        nodeId: obj.id,
        lat: obj.y,
        lon: obj.x,
        timeZone: '2',
        s: getDynamicPassword(Parameters.ClientTicket)
      },
      function (response){
        self.trigger('schedule', response);
      }
    );
  };
}

// gestire errori relativi a richieste HTTP
function onRequestError(request) {
  'use strict';
  var errorMessage = request.error;
  if (!errorMessage) {
    errorMessage = translate('searching_error');
  }
  showError(errorMessage);

}
function showError(text) {
  'use strict';
  errorMsg.textContent = text;
  errorMsg.hidden = false;
  results.hidden = true;
}