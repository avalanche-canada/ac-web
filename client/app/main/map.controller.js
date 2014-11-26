/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('avalancheCanadaApp')
    .controller('MapCtrl', function ($scope, $rootScope, $timeout, $state, ENV, acForecast, acObservation) {
        angular.extend($scope, {
            env: ENV,
            current: {},
            drawer: {
                visible: false
            },
            filters: {
                obsType: [],
                obsPeriod: ['7-days']
            }
        });

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
            $state.go('ac.more');
            //$location.path('/more');
        };

        acForecast.fetch().then(function (forecasts) {
            $scope.regions = forecasts;
        });

        acObservation.byPeriod('2:days').then(function (obs) {
            $scope.obs = obs;
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

        // acBreakpoints.setBreakpoints({
        //             xs: 480,
        //             sm: 600,
        //             md: 1025,
        //         });

        // $rootScope.$on('breakpoint', function (e, breakpoint) {
        //     $scope.device.size = breakpoint;
        // });


        // $scope.toggleForm = function (form) {
        //     $scope.obs.form = form;
        // };
        
        // acObservation.byPeriod('7:days').then(function (obs) {
        //     $scope.observations = obs;
        // });

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
