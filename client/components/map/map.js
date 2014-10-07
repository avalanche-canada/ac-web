/* js-hint hacks. */
/* jshint unused:false  */
/* global L, leafletPip */
'use strict';

angular.module('acMap', ['constants', 'ngAnimate'])

    .controller('mapController', function ($scope, $rootScope, $http, $timeout, $location, acImageCache, ENV) {
        angular.extend($scope, {
            env: ENV,
            current: {},
            drawer: {
                visible: false
            }
        });

        $http.get('api/forecasts').then(function (res) {
            $scope.regions = res.data;
            var dangerIcons = _.map($scope.regions.features, function (r) {
                return r.properties.dangerIconUrl;
            });
            acImageCache.cache(dangerIcons);
        });

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
            $location.path('/more');
        };

        function fetchForecast(region){
            if (region.feature.properties.forecastUrl) {
                $http.get(region.feature.properties.forecastUrl).then(function (res) {
                    region.feature.properties.forecast = res.data;
                });
            }
        }

        $scope.$watch('current.region', function (newRegion, oldRegion) {
            if(newRegion && newRegion !== oldRegion) {
                $scope.drawer.visible = false;
                $scope.imageLoaded = false;

                if(!newRegion.feature.properties.forecast) {
                    fetchForecast(newRegion);
                }

                $timeout(function () {
                    $scope.drawer.visible = true;
                }, 800);
            }
        });

    })

    .directive('acMapboxMap', function ($rootScope, $http, $timeout, $document, $window) {
        return {
            template: '<div id="map"></div>',
            replace: true,
            scope: {
                mapboxAccessToken: '@',
                mapboxMapId: '@',
                region: '=',
                regions: '='
            },
            link: function ($scope, el, attrs) {
                var layers = {
                    dangerIcons: L.featureGroup()
                };
                var styles = {
                    region: {
                        default: {
                            fillColor: 'transparent',
                            color: 'transparent'
                        },
                        selected: {
                            fillColor: '#489BDF'
                        }
                    }
                };

                L.mapbox.accessToken = $scope.mapboxAccessToken;
                var map = L.mapbox.map(el[0].id, $scope.mapboxMapId, {attributionControl: false});

                function invalidateSize() {
                    el.height($($window).height()-75);
                    map.invalidateSize();
                }

                angular.element(document).ready(invalidateSize);
                angular.element($window).bind('resize', invalidateSize);

                map.on('moveend', function () {
                    if(map.getZoom() <= 6 && map.hasLayer(layers.dangerIcons)) {
                        map.removeLayer(layers.dangerIcons);
                    } else if (map.getZoom() > 6 && !map.hasLayer(layers.dangerIcons)){
                        map.addLayer(layers.dangerIcons);
                    }
                });

                function getMapPadding(){
                    var mapWidth = map.getSize().x;

                    if(mapWidth > 1025) {
                        return [480, 0];
                    } else if (mapWidth > 600) {
                        return [350, 0];
                    } else {
                        return [0, 0];
                    }
                }

                function getMapOffset(){
                    var mapPadding = getMapPadding();
                    return [mapPadding[0]/2, mapPadding[1]];
                }

                function getPaddedMapCenter(){
                    var mapCenterPoint = map.latLngToLayerPoint(map.getCenter()).subtract(getMapOffset());
                    return map.layerPointToLatLng(mapCenterPoint);
                }

                function setRegionFocus() {
                    if(map.getZoom() >= 9) {
                        var centerRegion;
                        var centerRegions = [];
                        var paddedMapCenter = getPaddedMapCenter();
                        var centerPoint = map.latLngToLayerPoint(paddedMapCenter);
                        var centerBounds = L.bounds([centerPoint.x-50, centerPoint.y-50], [centerPoint.x+50, centerPoint.y+50]);
                        var nw = map.layerPointToLatLng(centerBounds.max);
                        var se = map.layerPointToLatLng(centerBounds.min);
                        var centerLatLngBounds = L.latLngBounds(nw, se);

                        // find every regions which intersects map center bounds (100px square)
                        layers.regions.eachLayer(function (region) {
                            if (region.getBounds().intersects(centerLatLngBounds)) {
                                centerRegions.push(region);
                            }
                        });

                        // if there is more than one region look if one is within map bounds
                        if(centerRegions.length > 1) {
                            centerRegion =  _.find(centerRegions, function (region) {
                                return map.getBounds().contains(region.getBounds());
                            });
                        } else if (centerRegions.length === 1) { // otherwise select the one
                            centerRegion = centerRegions[0];
                        }

                        // no region was within map bounds; look for regions that contain map center
                        if(!centerRegion && centerRegions.length > 1) {
                            centerRegion = leafletPip.pointInLayer(getPaddedMapCenter(), layers.regions, true)[0];
                        }

                        // still no region; find the closest one by region centroid
                        // if (!centerRegion) {
                        //     centerRegion = _.min(centerRegions, function (r) {
                        //         return r.feature.properties.centroid.distanceTo(paddedMapCenter);
                        //     });
                        // }

                        $scope.$apply(function () {
                            $scope.region = centerRegion;
                        });
                    }
                }

                map.on('dragend', setRegionFocus);
                map.on('zoomend', setRegionFocus);

                $scope.$watch('region', function (region) {
                    if(region) {
                        layers.regions.eachLayer(function (layer) {
                            if(layer === region) {
                                region.setStyle(styles.region.selected);
                            } else {
                                layer.setStyle(styles.region.default);
                            }
                        });
                    }
                });

                $scope.$watch('regions', function (regions) {
                    if(regions && regions.features) {

                        layers.regions = L.geoJson($scope.regions, {
                            style: function(feature) {
                                return styles.region.default;
                            },
                            onEachFeature: function (featureData, layer) {
                                layer.bindLabel(featureData.properties.name, {noHide: true});

                                function showRegion(evt){
                                    var options =  { 
                                        paddingBottomRight: getMapPadding()
                                    };

                                    $scope.$apply(function () {
                                        $scope.region = layer;
                                    });

                                    if(map.getZoom() < 9) {
                                        map.fitBounds(layer.getBounds(), options);
                                    } else {
                                        var paddedClickedPoint = map.layerPointToLatLng(evt.layerPoint.add(getMapOffset()));
                                        map.panTo(paddedClickedPoint);
                                    }
                                }

                                layer.on('click', showRegion);

                                if(featureData.properties.centroid) {
                                    var centroid = L.latLng(featureData.properties.centroid[1], featureData.properties.centroid[0]);
                                    layer.feature.properties.centroid = centroid;

                                    L.marker(centroid, {
                                        icon: L.icon({
                                            iconUrl: featureData.properties.dangerIconUrl,
                                            iconSize: [80, 80]
                                        })
                                    }).on('click', showRegion).addTo(layers.dangerIcons);
                                }

                            }
                        }).addTo(map);
                    }
                });
            }
        };
    })

    .factory('acImageCache', function ($http) {
        return {
            cache: function (images) {
                images.forEach(function (i) {
                    $http.get(i);
                });
            }
        };
    })

    .directive('acForecastMini', function () {
        return {
            templateUrl: 'components/forecast/forecast-mini.html',
            scope: {
                forecast: '=acForecast'
            },
            link: function ($scope, el, attrs) {
                el.addClass('ac-forecast-mini');
            }
        };
    })

    .directive('imageLoading', function () {
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

    .filter('sanatizeHtml', function () {
        return function (item) {
            if (item) {
                return item.replace(/!_!/g, '').replace(/<style[\s\S]*<\/style>/g, '');
            }
        };
    })

    .filter('normalizeForecastTitle', function () {
        return function (item) {
            if (item) {
                return item.replace(/^Avalanche (Forecast|Bulletin) - /g, '');
            }
        };
    });