/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('avalancheCanadaApp')
    .controller('MapCtrl', function ($rootScope, $scope, $timeout, $state, acForecast, acObservation, obs, auth) {
        angular.extend($scope, {
            current: {},
            drawer: {
                visible: false
            },
            filters: {
                obsPeriod: '48-hours'
            }
        });

        if($state.current.data && $state.current.data.isLogin) {
            auth.signin({authParams: {scope: 'openid profile'}});

            auth.config.auth0lib.on('hidden', function () {
                if(!auth.isAuthenticated) {
                    $state.go('ac.map');
                }
            });
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

        $scope.toggleFilter = function (filter) {
            if(filter || !$scope.filters.obsPeriod){
                filter = filter || 'obsPeriod:48-hours';
                var filterType = filter.split(':')[0];
                var filterValue = filter.split(':')[1];

                if(filterType === 'obsPeriod') {
                    $scope.filters[filterType] = filterValue;
                    var period = filterValue.replace('-', ':');
                    acObservation.byPeriod(period).then(function (obs) {
                        $scope.obs = obs;
                    });
                }
            } else {
                $scope.obs = [];
                $scope.filters.obsPeriod = '';
            }
        };

    });
