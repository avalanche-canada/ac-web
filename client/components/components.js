/* js-hint hacks. */
/* jshint unused:false  */
'use strict';

angular.module('acComponents', ['constants', 'ngAnimate'])
    .factory('acBreakpoints', function ($rootScope, $timeout, $window) {
        return {
            setBreakpoints: function (breakpoints) { // {xs: 400, sm: 600, md: 1025}
                var breakpoint;

                function broadcastBreakpoint() {
                    var bp;
                    var width = $($window).width();

                    if(width < breakpoints.xs) {
                        bp = 'xs';
                    } else if(width >= breakpoints.xs && width < breakpoints.sm) {
                        bp = 'sm';
                    } else if(width >= breakpoints.sm && width < breakpoints.md) {
                        bp = 'md';
                    } else {
                        bp = 'lg';
                    }

                    if(!breakpoint || bp !== breakpoint) {
                        breakpoint = bp;
                        $timeout(function () {
                            $rootScope.$broadcast('breakpoint', breakpoint);
                        }, 0);
                    }
                }

                broadcastBreakpoint();
                angular.element($window).bind('resize', broadcastBreakpoint);
            }
        };
    })

    .factory('acImageCache', function($http) {
        return {
            cache: function (images) {
                images.forEach(function (i) {
                    $http.get(i);
                });
            }
        };
    })

    .factory('acObservation', function ($http) {
        return {
            byPeriod: function (period) {
                var opt = {params: {period: period}};

                return $http.get('api/observations', opt).then(function (res) {
                    return res.data;
                });
            }
        };
    })

    .factory('acForecast', function ($http, acImageCache) {
        var forecasts;

        function cacheDangerIcons(){
            var dangerIcons = _.map(forecasts.features, function (f) {
                return f.properties.dangerIconUrl;
            });

            acImageCache.cache(dangerIcons);
        }

        return {
            fetch: function () {
                return $http.get('api/forecasts').then(function (res) {
                    forecasts = res.data;
                    cacheDangerIcons();
                    return forecasts;
                });
            },
            getOne: function (region) {
                region = _.find(forecasts.features, {id: region});

                return $http.get(region.properties.forecastUrl).then(function (res) {
                    return res.data;
                });
            }
        };
    })

    .directive('acImageLoading', function () {
        return function ($scope, el, attrs) {
            angular.element(el).bind('load', function () {
                $scope.imageLoaded = true;
                $scope.$apply();
            });

            attrs.$observe('ngSrc', function () {
                $scope.imageLoaded = false;
            });
        };
    })

    .directive('acDateFilter', function () {
        return function ($scope, el) {
            el.noUiSlider({
                start: [20, 80],
                connect: true,
                orientation: 'vertical',
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        };
    })

    .filter('acNormalizeForecastTitle', function () {
        return function (item) {
            if (item) {
                return item.replace(/^Avalanche (Forecast|Bulletin) - /g, '');
            }
        };
    });