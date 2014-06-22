(function () {
  'use strict';


/* Interactive Map Module
 * This directive creates a google map and adds interactive KML layers
 */
angular.module('directives.interactiveMap', [])
.directive('interactiveMap', function($window, $rootScope, $location, ENV){ //Bounds State google

 return function (scope, elem, attrs) {

       //! Home Control, map icon to take user to there current position
       function HomeControl(controlDiv, map) {
         // Set CSS styles for the DIV containing the control
         // Setting padding to 5 px will offset the control
         // from the edge of the map
         controlDiv.className = 'map-control-container';

         var controlUI = document.createElement('div');
         controlUI.className = 'map-control';
         controlUI.title = 'Click to set the map to Home';
         controlDiv.appendChild(controlUI);

         var controlText = document.createElement('div');
         controlText.className = 'map-control-text';
         controlText.innerHTML = '<strong>Current Pos</strong>';
         controlUI.appendChild(controlText);

         google.maps.event.addDomListener(controlUI, 'click',
          function() { map.setCenter(new google.maps.LatLng(scope.latitude, scope.longitude));});
       }
       // End Home Control

       if (typeof(google) !== undefined) {

        //! Get defaults from env vars
        var pos = new google.maps.LatLng(ENV.default_lat, ENV.default_long);

        var map_type = google.maps.MapTypeId.TERRAIN;
        switch(ENV.map_type){
          case 'TERRAIN':
            map_type = google.maps.MapTypeId.TERRAIN;
            break;
          case 'ROADMAP':
            map_type = google.maps.MapTypeId.ROADMAP;
            break;
          case 'HYBRID':
            map_type = google.maps.MapTypeId.HYBRID;
            break;
          case 'SATELLITE':
            map_type = google.maps.MapTypeId.SATELLITE;
            break;
          default:
            $log.error("ENV.map_type does not match any known map type. Using default");
        }

        //! Set Map Options
        var mapOptions = {
          center: pos,
          zoom: ENV.map_zoom,
          mapTypeId: map_type
        };

        var map = new google.maps.Map(elem[0], mapOptions);
        var myLatlng = new google.maps.LatLng(scope.latitude,scope.longitude);

        //This loads the google map 'Terms of Use' link in an external window
        /*$(elem[0]).on('click', 'a', function(e){
          e.preventDefault();
          window.open($(this).attr('href'),'_system','location=no');
        }); */

        //var bounds = Bounds.getBounds();

        /*if (bounds.set === true) {
          var ne = new google.maps.LatLng(bounds.nelat, bounds.nelon);
          var sw = new google.maps.LatLng(bounds.swlat, bounds.swlon);
          var newBounds = new google.maps.LatLngBounds(sw,ne);
          map.fitBounds(newBounds);
          map.setZoom(bounds.zoom);
        }

        var updateBounds = function () {
          var bounds = map.getBounds();
          var zoom = map.getZoom();
          var ne = bounds.getNorthEast();
          var sw = bounds.getSouthWest();
          scope.$apply(Bounds.setBounds(ne.lng(),ne.lat(),sw.lng(),sw.lat(),zoom));
        };

        //Add listeners to update bounds whenever map is dragged, zoom level changes, or map first loads (addListenerOnce)
        google.maps.event.addListener(map, 'dragend', function() {
          updateBounds();
        });

        //
        google.maps.event.addListener(map, 'zoom_changed', function() {
          updateBounds();
        });

        //
        google.maps.event.addListenerOnce(map, 'idle', function() {
          if (Bounds.getBounds().set === false) {
            updateBounds();
            console.log("Setting initial bounds");
          }
        }); */

        //! Add  bulletin  region layer
        //!{
        var regionKmlUrl = ENV.storage + ENV.bulletinRegion;

        var regionLayerOptions = {
         clickable: true,
         suppressInfoWindows: true, //! \todo enable this and make infowindows display nice information see git issue
         preserveViewport: true,
         map: map
        };

        var regionKmlLayer = new google.maps.KmlLayer(regionKmlUrl, regionLayerOptions);

        google.maps.event.addListener(regionKmlLayer, 'click', function(kmlEvent) {
         var region = kmlEvent.featureData.name;
         var path = "/bulletin/" + region;
         //alert(region);
         scope.$apply($location.path(path));

         /*scope.$apply(function() {
          scope.text = region + " Bulletin";
          });*/

        });
        //! }


        //! Add current position marker at lat long {
        var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title:"My Location"
        });

        var contentString = '<div id="infoWindowContent"><strong>You are here!</strong>'+'<br />'+
        'Tap region to see forecast</div>';

        var infoWindow = new google.maps.InfoWindow({
         content: contentString
        });

        if (window.localStorage.getItem("first") != "1") {
         infoWindow.open(map,marker);
        }

        google.maps.event.addListener(infoWindow,'closeclick',function(){
         window.localStorage.setItem("first", "1");
        });

        google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map,marker);
        });

        //}

      // This is a hack to get around some infowindow closing bug with Android 2.3
      // https://code.google.com/p/gmaps-api-issues/issues/detail?id=5397
      /*google.maps.event.addListener(infoWindow, 'domready', function() {
        var infoWindowCloseButton = $($($("#infoWindowContent").parents()[2]).children()[0]);
        infoWindowCloseButton.click(function(){
          infoWindow.close();
        });
      });*/

       /*//! watch for change in lat or long and call posUpdate if there is one, adjusting the map centre to the specified lat long
       var posUpdate = function (newValue, oldValue) {
        var newLatLng = new google.maps.LatLng(scope.latitude, scope.longitude);
        marker.setPosition(newLatLng);
        if (Bounds.getBounds().set === false) {
          map.panTo(newLatLng);
        }
       };
       scope.$watch('latitude',posUpdate);
       scope.$watch('longitude',posUpdate);
       //! */

       //! add home button
       var homeControlDiv = document.createElement('div');
       var homeControl = new HomeControl(homeControlDiv, map);
       //homeControlDiv.index = 1;
       map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
       //!

      } //End if(google)

    };
}); // end googleMap directive

}()); //! end strict mode function
