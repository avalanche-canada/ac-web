'use strict';
angular.module('avalancheCanadaApp')

  .config(function ($stateProvider) {
    $stateProvider
            .state('ac.map', {
                url: '',
                templateUrl: 'app/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                  obs: function (acObservation) {
                    return acObservation.byPeriod('2:days');
                  },
                  ob: function () {
                    return null;
                  }
                }
            })
            .state('ac.share', {
                url: '^/share/:obid',
                templateUrl: 'app/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                  obs: function ($http) {
                    return [];
                  },
                  ob: function ($stateParams, $http) {
                    return $http.get('/api/min/observations/' + $stateParams.obid).then(function (res) {
                        return [res.data];
                    });
                  }
                }
            })
            .state('ac.sled', {
                url: '^/sled',
                templateUrl: 'app/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sledPage: [function(){
                      return true;
                  }]
                }
            })
            .state('ac.more', {
                url: '^/more',
                templateUrl: 'app/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sledPage: [function(){
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

