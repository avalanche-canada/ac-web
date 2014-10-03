/* js-hint hacks. */
/* jshint unused:false  */
/* global L, leafletPip */
'use strict';

angular.module('acMap', ['ngAnimate'])

    .filter('sanatizeHtml', function () {
        return function (item) {
            if (item) {
                return item.replace(/!_!/g, '').replace(/<style[\s\S]*<\/style>/g, '');
            }
        };
    })

    .controller('mapController', function ($scope, $rootScope, $http, $q, GeoUtils, $timeout, $route, $location, ForecastIcons) {
        $scope.regions = {};
        $scope.current = {};
        $scope.drawer = {
            visible: false
        };

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
                    resolveForecastGraphics(region.forecast);
                });
            }
        }

        function resolveForecastGraphics(forecast){
            forecast.problems.forEach(function (problem) {
                problem.icons = {
                    elevations: ForecastIcons.getElevationIcon(problem.elevations),
                    aspects: ForecastIcons.getCompassIcon(problem.aspects),
                    likelihood: ForecastIcons.getLikelihoodIcon(problem.likelihood),
                    expectedSize: ForecastIcons.getSizeIcon(problem.expectedSize)
                };
            });
        }

        function setRegion(region) {
            if ($scope.current.region !== region) {
                $scope.drawer.visible = false;
                $scope.imageLoaded = false;

                $timeout(function () {
                    $scope.current.region = null;
                }, 400);

                if(!region.forecast) {
                    fetchForecast(region);
                }
                
                $timeout(function () {
                    $scope.current.region = region;
                    $scope.drawer.visible = true;
                }, 800);
            }
        }

        $scope.$on('mapmoveend', function (e, map) {
            var mapCenter = map.getCenter();
            var mapBounds = map.getBounds();

            for (var id in $scope.regions) {
                // var region = $scope.regions[id];
                //var inView = GeoUtils.polygonIntersectsBounds(region.polygon, mapBounds);

                $scope.regions[id].distanceToCenter = $scope.regions[id].polygon.getBounds().getCenter().distanceTo(mapCenter);
            }

            if(map.getZoom() > 9) {
                var region = _($scope.regions).min(function (r) { return r.distanceToCenter; }).value();
                setRegion(region);
            }
        });

        $scope.$on('regionclick', function (e, region) {
            setRegion(region);
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

    .factory('ForecastIcons', function () {
        return {
            getElevationIcon: function (elevations){
                var zones = elevations.reduce(function (memo, elevation) {
                    switch(elevation) {
                        case 'Btl':
                            memo[0] = 1;
                            break;
                        case 'Tln':
                            memo[1] = 1;
                            break;
                        case 'Alp':
                            memo[2] = 1;
                            break;
                        default:
                            break;
                    }

                    return memo;
                }, [0,0,0]);

                return 'http://www.avalanche.ca/Images/bulletin/Elevation/Elevation-'+ zones[0] +'-'+ zones[1] +'-'+ zones[2] +'_EN.png';
            },
            getCompassIcon: function (aspects){
                var result = aspects.reduce(function (memo, aspect) {
                    switch(aspect) {
                        case 'N':
                            memo[0] = 1;
                            break;
                        case 'NE':
                            memo[1] = 1;
                            break;
                        case 'E':
                            memo[2] = 1;
                            break;
                        case 'SE':
                            memo[3] = 1;
                            break;
                        case 'S':
                            memo[4] = 1;
                            break;
                        case 'SW':
                            memo[5] = 1;
                            break;
                        case 'W':
                            memo[6] = 1;
                            break;
                        case 'NW':
                            memo[7] = 1;
                            break;
                        default:
                            break;
                    }

                    return memo;
                }, [0,0,0,0,0,0,0,0]);

                //http://www.avalanche.ca/Images/bulletin/Compass/compass-0-1-1-1-1-1-0-0_EN.png
                return 'http://www.avalanche.ca/Images/bulletin/Compass/compass-'+ result[0]+'-'+ result[1] +'-'+ result[2] +'-'+ result[3] +'-'+ result[4] +'-'+ result[5] +'-'+ result[6] +'-'+ result[7]+'_EN.png';
            },
            getLikelihoodIcon: function (likelihood) {
                var nLikelihood = '';
                if (/([A-Z])\w+/.test(likelihood)) {
                    switch(likelihood) {
                        case 'Unlikely':
                            nLikelihood = 1;
                            break;
                        case 'Possible - Unlikely':
                            nLikelihood = 2;
                            break;
                        case 'Possible':
                            nLikelihood = 3;
                            break;
                        case 'Likely - Possible':
                            nLikelihood = 4;
                            break;
                        case 'Likely':
                            nLikelihood = 5;
                            break;
                        case 'Very Likely - Likely':
                            nLikelihood = 6;
                            break;
                        case 'Very Likely':
                            nLikelihood = 7;
                            break;
                        case 'Certain - Very Likely':
                            nLikelihood = 8;
                            break;
                        case 'Certain':
                            nLikelihood = 9;
                            break;
                        default:
                            break;
                    }
                } else {
                    nLikelihood = Number(likelihood);
                }

                return 'http://www.avalanche.ca/Images/bulletin/Likelihood/Likelihood-'+ nLikelihood +'_EN.png';
            },
            getSizeIcon: function (size) {
                var nSize = '';
                nSize = Number(size);
                
                return 'http://www.avalanche.ca/Images/bulletin/Size/Size-'+ nSize*2 +'-'+ ((nSize*2) + 1) +'_EN.png';
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

    .directive('acMapboxMap', function ($rootScope, $http, $q, $timeout, $document, $window) {
        return {
            template: '<div id="map"></div>',
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

                function invalidateSize() {
                    el.height($($window).height()-75);
                    map.invalidateSize();
                }

                angular.element(document).ready(invalidateSize);
                angular.element($window).bind('resize', invalidateSize);

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

                $scope.$watch('region', function (region) {
                    if(region) {
                        setRegion(region);
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
                                        //window.open(externalRegionsLinks[featureData.properties.id], '_blank');
                                    } else {
                                        // map.fitBounds(region.polygon.getBounds(), {paddingBottomRight: [500, 0]});
                                        setRegion(region);
                                        $rootScope.$broadcast('regionclick', region);
                                    }

                                    setRegion(region);

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

                        region.polygon.setStyle({ fillColor: '#489BDF'});
                    }, 0);
                }

            }
        };
    })

    .directive('acMapDrawer', function ($rootScope) {
        return {
            template:   '<div class="panel">' +
                            '<div id="drawerBody" class="panel-body collapse" ng-transclude>' +
                            '</div>' +
                        '</div>',
            replace: true,
            transclude: true,
            scope: {
                region: '='
            },
            link: function ($scope, el, attrs) {

            }
        };
    });
