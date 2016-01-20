'use strict';

angular.module('avalancheCanadaApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ac.map', {
                url: '',
                templateUrl: 'app/avalanchecanada/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                  obs: function (acObservation) {
                    return acObservation.byPeriod('7:days');
                  }
                }
            })
            .state('ac.login', {
                url: 'login',
                templateUrl: 'app/avalanchecanada/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                   obs: function (acObservation) {
                    return acObservation.byPeriod('7:days');
                  }
                },
                data: {
                  isLogin: true
                }
            })
            .state('ac.share', {
                url: '^/share/:title/:subid',
                templateUrl: 'app/avalanchecanada/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                  obs: function (acSubmission, $stateParams) {
                   return acSubmission.getOne($stateParams.subid);
                  }
                },
                data: {
                  isShare: true
                }
            })
            .state('ac.focus', {
                url: '^/focus/:markerid',
                templateUrl: 'app/avalanchecanada/main/map.html',
                controller: 'MapCtrl',
                resolve: {
                    obs: function (acObservation) {
                        return acObservation.byPeriod('7:days');
                    }
                }
            })
            .state('ac.sled', {
                url: '^/sled',
                templateUrl: 'app/avalanchecanada/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sledPage: [function(){
                      return true;
                  }]
                }
            })
            .state('ac.more', {
                url: '^/more',
                templateUrl: 'app/avalanchecanada/main/more.html',
                controller: 'MoreCtrl',
                resolve:{
                  sledPage: [function(){
                      return false;
                  }]
                }
            })
            .state('ac.reports', {
                url: '^/reports/:subid',
                templateUrl: 'app/avalanchecanada/reports/reportsFullPage.html',
                controller: 'ReportsCtrl',
                resolve: {
                    report: function (acSubmission, $stateParams) {
                        return acSubmission.getOne($stateParams.subid);
                    }
                }
            });
    });

