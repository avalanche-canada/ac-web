'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('more', {
        url: '/more',
        templateUrl: 'app/main/more.html',
        controller: 'MainCtrl'
      })
      .state('map', {
        url: '/',
        templateUrl: 'app/main/map.html',
        controller: 'MapCtrl'
      })
      ;
  });
