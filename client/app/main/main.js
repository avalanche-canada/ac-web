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
  // .config(function ($stateProvider) {
  //   $stateProvider
  //       .state('main', {
  //           abstract: true,
  //           url: '/',
  //           templateUrl: 'app/main/main.html'
  //       })
  //       .state('main.map', {
  //           url: '',
  //           templateUrl: 'app/main/map.html',
  //           controller: 'MapCtrl'
  //       })
  //       .state('main.more', {
  //           url: '^/more',
  //           templateUrl: 'app/main/more.html',
  //           controller: 'MoreCtrl'
  //       });
  // });
