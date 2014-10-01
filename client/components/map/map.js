/* js-hint hacks. */
/* jshint unused:false  */
/* global L, leafletPip */
'use strict';

angular.module('acMap', ['ngAnimate'])

    .controller('mapController', function ($scope, $rootScope, $http, $q, GeoUtils, $timeout, $route, $location) {
        $scope.regions = {};
        $scope.current = {};

        $scope.showMore = function () {
            $rootScope.pageClass = 'page-down';
            $location.path('/more');
        };

        function fetchData() {
            var dataEndpoint = ['/api/cac-polygons.geojson', '/api/region-centroids.geojson', '/api/areas.geojson'];
            var dataRequests = dataEndpoint.map(function (url) { return $http.get(url); });

            return $q.all(dataRequests).then(function (res) {
                $scope.polygons = res[0].data;
                $scope.centroids = res[1].data;
            });
        }
        fetchData();

        function fetchForecast(region){
            var regionId = region.polygon.feature.properties.id;
            var forecastEndpoint = '/api/forecasts/' + regionId + '.json';

            // todo: temp safety... external regions should return something
            if (!_.contains(['north-rockies', 'vancouver-island', 'yukon-klondike', 'whistler-blackcomb', 'chic-chocs'], regionId)) {
                $http.get(forecastEndpoint).then(function (res) {
                    region.forecast = res.data;
                });
            }
        }

        $scope.$on('mapmoveend', function (e, map) {
            var mapCenter = map.getCenter();
            var mapBounds = map.getBounds();

            for (var id in $scope.regions) {
                var region = $scope.regions[id];

                var inView = GeoUtils.polygonIntersectsBounds(region.polygon, mapBounds);

                region.distanceToCenter = region.polygon.getBounds().getCenter().distanceTo(mapCenter);

                if(inView) {
                    if(!region.forecast) {
                        fetchForecast(region);
                    }
                }
            }

            // if(map.getZoom() > 9) {
            //     $timeout(function () {
            //         $scope.current.region = _($scope.regions).min(function (r) { return r.distanceToCenter; }).value();
            //     });
            // }
        });

        $scope.$on('regionclick', function (e, region) {
            $scope.current.region = region;
        });

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

    .directive('acMapboxMap', function ($rootScope, $http, $q, $timeout, $document) {
        return {
            template: '<div id="mapboxMap"></div>',
            replace: true,
            scope: {
                mapboxAccessToken: '@',
                mapboxMapId: '@',
                region: '=',
                regions: '=',
                polygons: '=',
                centroids: '='
            },
            link: function ($scope, el, attrs) {
                var layers = {};
                var externalRegionsLinks = {
                    'north-rockies': 'http://blogs.avalanche.ca/category/northrockies/',
                    'vancouver-island': 'http://www.islandavalanchebulletin.com/',
                    'yukon-klondike': 'http://www.avalanche.ca/dataservices/cac/bulletins/xml/yukon',
                    'whistler-blackcomb': 'http://www.whistlerblackcomb.com/the-mountain/backcountry/avalanche-advisory.aspx',
                    'chic-chocs': 'http://avalanche.ca'
                };

                L.mapbox.accessToken = $scope.mapboxAccessToken;
                var map = L.mapbox.map(el[0].id, $scope.mapboxMapId, {attributionControl: false});
                $timeout(function () {
                    el[0].style.height = ($document.height()-75) + 'px';
                    map.invalidateSize();
                }, 500);

                map.on('moveend', function () {

                    $scope.$apply(function () {
                        $rootScope.$broadcast('mapmoveend', map);
                    });

                    if(map.getZoom() <= 6 && map.hasLayer(layers.dangerIcons)) {
                        map.removeLayer(layers.dangerIcons);
                    } else if (map.getZoom() > 6 && !map.hasLayer(layers.dangerIcons)){
                        map.addLayer(layers.dangerIcons);
                    }

                });

                $scope.$watch('polygons', function (polygons) {
                    if(polygons) {
                        layers.regions = L.geoJson($scope.polygons, {
                            contextmenu: true,
                            style: function(feature) {
                                return {
                                    fillColor: 'transparent',
                                    color: 'transparent'
                                };
                            },
                            onEachFeature: function (featureData, layer) {
                                var region = $scope.regions[featureData.properties.id] = {
                                    polygon: layer
                                };

                                region.polygon.bindLabel(featureData.properties.name, {noHide: true});

                                region.polygon.on('click', function (e) {
                                    var mapZoom = map.getZoom();
                                    var externalRegions = _.keys(externalRegionsLinks);
                                    var isExternalRegion = _.contains(externalRegions, featureData.properties.id);

                                    if (isExternalRegion) {
                                        window.open(externalRegionsLinks[featureData.properties.id], '_blank');
                                    } else {
                                        // map.fitBounds(region.polygon.getBounds(), {paddingBottomRight: [500, 0]});
                                        setRegion(region);
                                        $rootScope.$broadcast('regionclick', region);
                                    }

                                    $('.ac-drawer .panel-body').collapse('show');

                                    if(mapZoom <= 9) {
                                        map.fitBounds(region.polygon.getBounds(), { paddingBottomRight: [500, 0] });
                                    } else {
                                        map.panTo(region.centroid._latlng);
                                    }
                                });
                            }
                        }).addTo(map);
                    }
                });

                $scope.$watch('centroids', function (centroids) {
                    if(centroids) {
                        centroids = _(centroids.features).filter(function (c) {
                            var externalRegions = _.keys(externalRegionsLinks);
                            return !_.contains(externalRegions, c.properties.id);
                        });

                        layers.dangerIcons = L.geoJson(centroids.value(), {
                            pointToLayer: function (featureData, latLng) {
                                return L.marker(latLng, {
                                    icon: L.icon({
                                        iconUrl: '/api/forecasts/' + featureData.properties.id + '/danger-rating-icon.svg',
                                        iconSize: [60, 60]
                                    })
                                });
                            },
                            onEachFeature: function (featureData, layer) {
                                var region = $scope.regions[featureData.properties.id];
                                region.centroid = layer;

                                layer.on('click', function () {
                                    map.fitBounds(region.polygon.getBounds(), {paddingBottomRight: [500, 0]});
                                    setRegion(region);
                                    $rootScope.$broadcast('regionclick', region);

                                    $('.ac-drawer .panel-body').collapse('show');
                                });

                            }
                        }).addTo(map);
                    }
                });

                $scope.$watch('region', function (region) {
                    if(region) {
                        setRegion(region);
                    }
                });

                function setRegion (region) {
                    $timeout(function () {
                        layers.regions.eachLayer(function (layer) {
                            layer.setStyle({ fillColor: 'transparent' });
                        });

                        if(map.getZoom() < 11) {
                            region.polygon.setStyle({ fillColor: '#489BDF'});
                        }
                    }, 0);
                }

            }
        };
    })

    .directive('acMapDrawer', function ($rootScope) {
        return {
            template:   '<div class="panel panel-primary">' +
                            '<div class="panel-heading" data-toggle="collapse" data-target="#drawerBody"">' +
                                '<div class="row">' +
                                    '<div class="col-xs-6">' +
                                        '<img class="ac-region-danger-icon" src="/api/forecasts/{{ region.polygon.feature.properties.id }}/danger-rating-icon.svg"/>' +
                                        '<h3 class="panel-title">{{ region.polygon.feature.properties.name }}</h3>' +
                                    '</div>' +
                                    '<div class="col-xs-6">' +
                                        '<i class="fa fa-angle-up fa-inverse fa-lg pull-right"/>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div id="drawerBody" class="panel-body collapse" ng-transclude>' +
                            '</div>' +
                            '<div class="panel-footer">' +
                                '<ul class="list-inline">' +
                                    '<li>' +
                                        '<small>Date Issued: {{ region.forecast.dateIssued | date:\'MMM d, y h:mm:ss a\' }}</small>' +
                                    '</li>' +
                                    '<li>' +
                                        '<small>Valid Until: {{ region.forecast.validUntil | date:\'MMM d, y h:mm:ss a\' }}</small>' +
                                    '</li>' +
                            '</div>' +
                        '</div>',
            replace: true,
            transclude: true,
            scope: {
                region: '='
            },
            link: function ($scope, el, attrs) {
                $scope.toggleCollapse = function () {

                };
            }
        };
    });
