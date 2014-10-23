'use strict';
angular.module('avalancheCanadaApp')

  .config(function ($stateProvider) {
    $stateProvider
            .state('ac.map', {
                url: '',
                templateUrl: 'app/main/map.html',
                controller: 'MapCtrl'
            })

            .state('ac.more', {
                url: '^/more',
                templateUrl: 'app/main/more.html',
                controller: 'MoreCtrl'
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

