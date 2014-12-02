'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ac.login', {
                url: '^/login',
                templateUrl: 'app/main/map.html',
                controller: function ($scope, auth) {
                    auth.signin({authParams: {scope: 'openid profile'}});
                }
            })
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
                url: '^/share/:title/:obid',
                templateUrl: 'app/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                  obs: function () {
                    return [];
                  },
                  ob: function ($stateParams, $http) {
                    return $http.get('/api/min/observations/' + $stateParams.obid).then(function (res) {
                        return res.data;
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
            });
    });

