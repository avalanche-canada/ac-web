'use strict';

angular.module('avalancheCanadaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'constants'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

/*  .run( function(ENV) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

      if( $location.path() != "tou" && $location.path() != "/")
      {
        if ( TOU.accepted() == false ) {
            $location.path( "/tou" );
          }
      }

    });

    $rootScope.$on('$routeChangeSuccess', function () {
        GoogleAnalytics.trackPage($location.path());
    })


 })*/

