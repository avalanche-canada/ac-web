'use strict';
/*
angular.module('avalancheCanadaApp')
    .config(function ($routeProvider) {

        $routeProvider
            .when('/sponsors', {
                templateUrl: 'app/sponsors/sponsors.html',
                controller: 'SponsorsCtrl'
            });

    });
*/
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.sponsors', {
        url: '^/sponsors',
        templateUrl: 'app/sponsors/sponsors.html',
        controller: 'SponsorsCtrl'
      });
  });
