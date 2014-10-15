/* js-hint hacks. */
/* jshint unused:false  */
/* global L, leafletPip, gju */
'use strict';

angular.module('acMap', ['constants', 'ngAnimate'])

    .controller('mapController', function ($scope, $rootScope, $http, $timeout, $window, $location, acImageCache, ENV) {
        angular.extend($scope, {
            env: ENV,
            current: {},
            drawer: {
                visible: false
            },
            device: {},
            filters: {
                obsType: []
            }
        });

        $http.get('api/forecasts').then(function (res) {
            $scope.regions = res.data;
            var dangerIcons = _.map($scope.regions.features, function (r) {
                return r.properties.dangerIconUrl;
            });
            acImageCache.cache(dangerIcons);
        });

        $http.get('api/forecasts/areas').then(function (res) {
            $scope.areas = res.data;
        });

        $http.get('api/observations').then(function (res) {
            $scope.observations = res.data;
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

        function setDeviceSize() {
            var width = $($window).width();

            $timeout(function () {
                if(width < 480) {
                    $scope.device.size = 'xs';
                } else if(width >= 480 && width < 600) {
                    $scope.device.size = 'sm';
                } else if(width >= 600 && width < 1025) {
                    $scope.device.size = 'md';
                } else {
                    $scope.device.size = 'lg';
                }
            }, 0);
        }

        angular.element($window).bind('resize', setDeviceSize);

        setDeviceSize();

        $scope.toggleAvalanches = function () {
            if(_.contains($scope.filters.obsType, 'avalanche') ){
                $scope.filters.obsType = _.without($scope.filters.obsType, 'avalanche');
            } else {
                $scope.filters.obsType.push('avalanche');
            }
        };

        $scope.toggleIncidents = function () {
            if(_.contains($scope.filters.obsType, 'incident') ){
                $scope.filters.obsType = _.without($scope.filters.obsType, 'incident');
            } else {
                $scope.filters.obsType.push('incident');
            }
        };

    })

    .directive('acMapboxMap', function ($rootScope, $http, $timeout, $document, $window) {
        return {
            template: '<div id="map"></div>',
            replace: true,
            scope: {
                mapboxAccessToken: '@',
                mapboxMapId: '@',
                region: '=',
                regions: '=',
                areas: '=',
                obs: '=',
                filters: '=',
                deviceSize: '='
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

                var provinces = L.mapbox.geocoder('mapbox.places-province-v1');

                provinces.query('British-Columbia', function (err, results) {
                    var bcBounds = L.latLngBounds([results.bounds[1], results.bounds[0]], [results.bounds[3], results.bounds[2]]);
                    map.fitBounds(bcBounds);
                });

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


                function latLngToGeoJSON(latlng){
                    return {
                        type: 'Point',
                        coordinates: [latlng.lng, latlng.lat]
                    };
                }

                function getMapPadding(){
                    switch($scope.deviceSize) {
                        case 'xs':
                            return L.point([0, 0]);
                        case 'sm':
                            return L.point([350, 0]);
                        case 'md':
                        case 'lg':
                            return L.point([480, 0]);
                        default:
                            return L.point([0,0]);
                    }
                }

                function getMapOffset(){
                    return getMapPadding().divideBy(2);
                }

                // offfset can be negative i.e. [-240, 0]
                function offsetLatLng(latlng, offset){
                    var point = map.latLngToLayerPoint(latlng);
                    return map.layerPointToLatLng(point.subtract(offset));
                }

                function getMapCenter(){
                    var offset = getMapOffset();
                    return offsetLatLng(map.getCenter(), offset);
                }

                function getMapBounds() {
                    var latLngBounds = map.getBounds();
                    var min = map.latLngToLayerPoint(latLngBounds.getNorthWest());
                    var max = map.latLngToLayerPoint(latLngBounds.getSouthEast());
                    var padding = getMapPadding();

                    var bounds = L.bounds(min, max.subtract(padding));
                    var nw = map.layerPointToLatLng(bounds.max);
                    var se = map.layerPointToLatLng(bounds.min);

                    return L.latLngBounds(nw, se);
                }

                function getMapCenterBuffer(){
                    var mapCenter = getMapCenter();
                    var centerPoint = map.latLngToLayerPoint(mapCenter);
                    var buffer = L.bounds([centerPoint.x-50, centerPoint.y-50], [centerPoint.x+50, centerPoint.y+50]);

                    var nw = map.layerPointToLatLng(buffer.max);
                    var se = map.layerPointToLatLng(buffer.min);

                    return  L.latLngBounds(nw, se);
                }

                function setRegionFocus() {
                    if(map.getZoom() >= 8) {
                        var region;
                        var centerBuffer = getMapCenterBuffer();
                        var regions = layers.regions.getLayers();
                        var mapCenter = getMapCenter();
                        var mapBounds = getMapBounds();

                        var intersectsCenterBuffer = _.filter(regions, function (r) {
                            return centerBuffer.intersects(r.getBounds());
                        });

                        var withinMapBounds = _.filter(regions, function (r) {
                            return mapBounds.contains(r.getBounds());
                        });

                        var containsMapCenter = _.find(regions, function (r) {
                            return gju.pointInPolygon(latLngToGeoJSON(mapCenter), r.feature.geometry);
                        });

                        var centroidInMapBounds = _.filter(regions, function (r) {
                            return mapBounds.contains(r.feature.properties.centroid);
                        });

                        var intersectsCenterBufferAnWithinMapBounds = _.intersection(intersectsCenterBuffer, withinMapBounds);

                        if(intersectsCenterBufferAnWithinMapBounds.length === 1){
                            region = intersectsCenterBufferAnWithinMapBounds[0];
                        } else if(intersectsCenterBufferAnWithinMapBounds.length > 1) {
                            region = _.min(intersectsCenterBufferAnWithinMapBounds, function (r) {
                                return r.feature.properties.centroid.distanceTo(mapCenter);
                            });
                        } else if(centroidInMapBounds.length === 1){
                            region = centroidInMapBounds[0];
                        } else if(centroidInMapBounds.length > 1){
                            region = _.min(centroidInMapBounds, function (r) {
                                return r.feature.properties.centroid.distanceTo(mapCenter);
                            });
                        } else if (containsMapCenter) {
                            region = containsMapCenter;
                        }

                        $scope.$apply(function () {
                            $scope.region = region;
                        });
                    }
                }

                map.on('dragend', setRegionFocus);
                map.on('zoomend', function () {
                    var mapZoom = map.getZoom();
                    var opacity = 0.2;

                    setRegionFocus();

                    if(layers.currentRegion) {
                        if(mapZoom <= 9) {
                            styles.region.selected.fillOpacity = opacity;
                            layers.currentRegion.setStyle(styles.region.selected);
                        } else if(mapZoom > 9 && mapZoom < 13){
                            switch(mapZoom){
                                case 10:
                                    opacity = 0.15;
                                    break;
                                case 11:
                                    opacity = 0.10;
                                    break;
                                case 12:
                                    opacity = 0.05;
                                    break;
                            }

                            styles.region.selected.fillOpacity = opacity;
                            layers.currentRegion.setStyle(styles.region.selected);
                        } else {
                            layers.currentRegion.setStyle(styles.region.default);
                        }
                    }

                    if(layers.obs && mapZoom > 7 && !map.hasLayer(layers.obs)) {
                        $scope.filters.obsType = ['avalanche', 'incident'];
                        map.addLayer(layers.obs);
                    } else if(layers.obs && mapZoom <= 7 && map.hasLayer(layers.obs)){
                        map.removeLayer(layers.obs);
                    }

                });

                $scope.$watch('region', function (region) {
                    if(region) {
                        layers.regions.eachLayer(function (layer) {
                            var style = (layer === region ? styles.region.selected : styles.region.default);
                            layer.setStyle(style);
                            layers.currentRegion = layer;
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
                                    if(map.getZoom() < 9) {
                                        map.fitBounds(layer.getBounds(), { paddingBottomRight: getMapPadding() });
                                    } else {
                                        var offset = getMapOffset();
                                        offset.x = -offset.x;
                                        map.panTo(offsetLatLng(evt.latlng, offset));
                                    }

                                    $scope.$apply(function () {
                                        $scope.region = layer;
                                    });
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

                $scope.$watch('obs', function (obs) {
                    if(obs && obs.features) {
                        layers.obs = L.geoJson(obs, {
                            filter: function (featureData, layer) {
                                return _.contains($scope.filters.obsType, featureData.properties.obsType);
                            }
                        });
                    }
                });

                $scope.$watchCollection('filters.obsType', function (filters) {
                    if (map.hasLayer(layers.obs)){
                        map.removeLayer(layers.obs);
                    }

                    layers.obs = L.geoJson($scope.obs, {
                        filter: function (featureData, layer) {
                            return _.contains($scope.filters.obsType, featureData.properties.obsType);
                        }
                    }).addTo(map);
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

    .directive('acDrawer', function () {
        return {
            replace: true,
            transclude: true,
            templateUrl: 'components/map/drawer.html',
            link: function ($scope, el, attrs) {
                el.addClass('ac-drawer');
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

    .directive('acDateFilter', function () {
        return function ($scope, el, attrs) {
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
