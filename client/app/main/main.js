'use strict';
angular.module('avalancheCanadaApp')

  .config(function ($stateProvider) {
    $stateProvider
            .state('ac.map', {
                url: '',
                templateUrl: 'app/main/map.html',
                controller: 'MapCtrl'
            })
            .state('ac.sled', {
                url: '^/sled',
                templateUrl: 'app/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sled: [function(){
                      return true;
                  }]
                }
            })
            .state('ac.more', {
                url: '^/more',
                templateUrl: 'app/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sled: [function(){
                      return false;
                  }]
                }
            })
            ;
  });


/*    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/main/map.html',
            controller: 'MapCtrl'
        })
        .when('/more', {
            templateUrl: 'app/main/more.html',
            controller: 'MoreCtrl'
        });
  });
*/

