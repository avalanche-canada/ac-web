/* js-hint hacks. */
/* jshint unused:false  */
/* global L, leafletPip */
'use strict';

angular.module('acMap', ['ngAnimate'])

    .controller('mapController', function ($scope, $rootScope, $http, $q, GeoUtils, $timeout, $route, $location) {
        angular.extend($scope, {
            current: {},
            drawer: {
                visible: false
            }
        });

        $http.get('api/forecasts').then(function (res) {
            $scope.regions = res.data;
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

    .directive('acMapboxMap', function ($rootScope, $http, $q, $timeout, $document, $window) {
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

                    if(map.getZoom() > 9) {
                        var region = leafletPip.pointInLayer(map.getCenter(), layers.regions, true)[0];
                        if (region) {
                            $scope.$apply(function () {
                                $scope.region = region;
                            });
                        }
                    }
                });

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
                    if(regions.features) {

                        layers.regions = L.geoJson($scope.regions, {
                            style: function(feature) {
                                return styles.region.default;
                            },
                            onEachFeature: function (featureData, layer) {
                                layer.bindLabel(featureData.properties.name, {noHide: true});
                                layer.on('click', function () {
                                    selectRegion(layer);
                                });

                                if(featureData.properties.centroid) {
                                    var centroid = L.latLng(featureData.properties.centroid[1], featureData.properties.centroid[0]);
                                    layer.feature.properties.centroid = centroid;

                                    L.marker(centroid, {
                                        icon: L.icon({
                                            iconUrl: featureData.properties.dangerIconUrl,
                                            iconSize: [60, 60]
                                        })
                                    }).on('click', function () {
                                        selectRegion(layer);
                                    }).addTo(layers.dangerIcons);
                                }

                            }
                        }).addTo(map);

                    }
                });

                function selectRegion(region) {
                    $scope.$apply(function () {
                        $scope.region = region;
                    });

                    if(map.getZoom() <= 9) {
                        map.fitBounds(region.getBounds(), { paddingBottomRight: [500, 0] });
                    } else {
                        map.panTo(region.feature.properties.centroid);
                    }
                }
            }
        };
    })

    .directive('acMapDrawer', function () {
        return {
            link: function ($scope, el, attrs) {

            }
        };
    })

    .factory('GeoUtils', function () {
        return {
            latLngsInBounds: function (latLngs, bounds){
                return _.some(latLngs, function (latLng) { return bounds.contains(latLng); } );
            },
            polygonIntersectsBounds: function (polygon, bounds){
                return bounds.intersects(polygon.getBounds()) && this.latLngsInBounds(polygon.getLatLngs(), bounds);
            },
            getPolygonForPoint: function (latlng, polygons){
                return leafletPip.pointInLayer(latlng, polygons, true)[0];
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
    });