/**
 * Homepage module
 */
angular.module( 'avalancheCanada.home', [
  'ui.router',
  'plusOne',
  'directives.interactiveMap'
])

.config(function config( $stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Avalanche Canada' }
  });
})

/**
 * Home Controller
 * $log angular log service
 * ENV environment constants
 * $scope application model object
 */
.controller( 'HomeCtrl', function HomeController( $scope, ENV, $log, $location ) {


  /*

    function initialize() {
      $log.info("google maps initialised adding layers");


      var regionKmlLayer = new google.maps.KmlLayer(regionKmlUrl, regionLayerOptions);

      google.maps.event.addListener(regionKmlLayer, 'click', function(kmlEvent) {
       var region = kmlEvent.featureData.name;
       var path = "/bulletin/" + region;
       //alert(region);
       $scope.$apply($location.path(path));
      });

      //! todo check user preferences to see if they want this set to auto or have manually setup

      //! if geolocation is available then update map center
      if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {
          $log.info("position obtained from geolocation service");

          pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude) ;

          //! update map center with new position
          $scope.myMap.setCenter(pos);

          //! Add marker at position
          new google.maps.Marker({
              map: $scope.myMap,
              position:  pos,
              title: "You Are Here"
          });

        });

      }

    }

    //google.maps.event.addDomListener(window, 'load', initialize); */


})

;

