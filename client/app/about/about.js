'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/main/map.html',
                controller: 'mapController'
            });
    });
  /*.config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      });
  });*/
