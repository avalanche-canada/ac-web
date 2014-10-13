'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/main/map.html',
            controller: 'mapController'
        })
        .when('/more', {
            templateUrl: 'app/main/more.html',
            controller: 'MoreCtrl'
        });
  });
