/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('avalancheCanadaApp')
    .controller('MapCtrl', function ($rootScope, $scope, $timeout, $state, acForecast, obs, auth) {
        angular.extend($scope, {
            current: {},
            drawer: {
                visible: false
            },
            filters: {
                obsType: [],
                obsPeriod: ['7-days']
            }
        });

        if($state.current.data && $state.current.data.isLogin) {
            auth.signin({authParams: {scope: 'openid profile'}});
        }

        if($state.current.data && $state.current.data.isShare) {
            $scope.current.ob = obs[0];
        } else {
            $scope.obs = obs;
        }

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
            $state.go('ac.more');
        };

        acForecast.fetch().then(function (forecasts) {
            $scope.regions = forecasts;
        });

        $scope.$watch('current.region', function (newRegion, oldRegion) {
            if(newRegion && newRegion !== oldRegion) {
                $scope.drawer.visible = false;
                $scope.imageLoaded = false;

                if(!newRegion.feature.properties.forecast) {
                    acForecast.getOne(newRegion.feature.id).then(function (forecast) {
                        newRegion.feature.properties.forecast = forecast;
                    });
                }

                $timeout(function () {
                    $scope.drawer.visible = true;
                }, 800);
            }
        });

        // $scope.toggleFilter = function (filter) {
        //     var filterType = filter.split(':')[0];
        //     var filterValue = filter.split(':')[1];

        //     if(filterType === 'obsPeriod') {
        //         $scope.filters[filterType] = [];
        //         var period = filterValue.replace('-', ':');
        //         acObservation.byPeriod(period).then(function (obs) {
        //             $scope.observations = obs;
        //         });
        //     }

        //     if(_.contains($scope.filters[filterType], filterValue) ){
        //         $scope.filters[filterType] = _.without($scope.filters[filterType], filterValue);
        //     } else {
        //         $scope.filters[filterType].push(filterValue);
        //     }
        // };

    });
