angular.module('acMap', ['ngAnimate'])

    .controller('mapController', function ($scope) {
        $scope.$on('moveend', function (e, map) {
            $scope.drawerVisible = (map.getZoom() > 7);
        });
    })

    .directive('acMapboxMap', function ($rootScope, $http, $q, $timeout) {
        return {
            template: '<div id="mapboxMap"></div>',
            replace: true,
            scope: {
                mapboxAccessToken: '@',
                mapboxMapId: '@',
                region: '='
            },
            link: function ($scope, el, attrs) {
                var externalRegionsLinks = {
                    'north-rockies': 'http://blogs.avalanche.ca/category/northrockies/',
                    'vancouver-island': 'http://www.islandavalanchebulletin.com/',
                    'yukon-klondike': 'http://www.avalanche.ca/dataservices/cac/bulletins/xml/yukon',
                    'whistler-blackcomb': 'http://www.whistlerblackcomb.com/the-mountain/backcountry/avalanche-advisory.aspx',
                    'chic-chocs': 'http://avalanche.ca'
                };

                L.mapbox.accessToken = $scope.mapboxAccessToken;
                var map = L.mapbox.map(el[0].id, $scope.mapboxMapId);
                $timeout(function () {
                    el[0].style.height = (document.getElementById('section0').offsetHeight-75) + 'px';
                    map.invalidateSize();
                }, 1000);

                map.on('moveend', function () {
                    var mapCenter = map.getCenter();

                    $scope.$apply(function () {
                        $rootScope.$broadcast('moveend', map);

                        for (var id in $scope.regions) {
                            var region = $scope.regions[id];

                            var inView = polygonIntersectsBounds(region.polygon, map.getBounds()) || (getMapCentrePolygon() === region.polygon);
                            region.visible = inView;

                            region.distanceToCenter = region.polygon.getBounds().getCenter().distanceTo(mapCenter);

                            if(inView) {
                                if(!region.forecast) fetchForecast(region);
                            }
                        }

                        // $scope.region = _($scope.regions).min(function (r) { return r.distanceToCenter; });
                    });

                });

                map.whenReady(fetchData);

                $scope.regions = {};
                var layers = {};

                function fetchData() {
                    var dataEndpoint = ['/api/cac-polygons.geojson', '/api/region-centroids.geojson', '/api/areas.geojson'];
                    var dataRequests = dataEndpoint.map(function (url) { return $http.get(url); });

                    return $q.all(dataRequests).then(initializeOverlays);
                }

                function initializeOverlays(overlayData) {
                    var polygons = overlayData[0].data;
                    var centroids = overlayData[1].data;
                    $scope.areas = overlayData[2].data;

                    layers.regions = L.geoJson(polygons, {
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
                                var externalRegions = _.keys(externalRegionsLinks);
                                var isExternalRegion = _.contains(externalRegions, featureData.properties.id);

                                if (isExternalRegion) {
                                    window.open(externalRegionsLinks[featureData.properties.id], '_blank');
                                } else {
                                    map.fitBounds(region.polygon.getBounds(), {paddingBottomRight: [500, 0]});
                                    $timeout(function () {
                                        layers.regions.eachLayer(function (layer) {
                                            layer.setStyle({ fillColor: 'transparent' });
                                        });
                                        layer.setStyle({ fillColor: 'grey' });
                                        $scope.region = region;
                                    }, 0);
                                }
                            });
                        }
                    }).addTo(map);

                    centroids = _(centroids.features).filter(function (c) {
                        var externalRegions = _.keys(externalRegionsLinks);
                        return !_.contains(externalRegions, c.properties.id);
                    });

                    L.geoJson(centroids.value(), {
                        pointToLayer: function (featureData, latLng) {
                            return L.marker(latLng, {
                                icon: L.icon({
                                    iconUrl: 'http://cac-map-dev-sw3aezcigf.elasticbeanstalk.com/forecasts/' + featureData.properties.id + '/danger-rating-icon.svg',
                                    iconSize: [60, 60]
                                })
                            });
                        },
                        onEachFeature: function (featureData, layer) {
                            $scope.regions[featureData.properties.id].centroid = layer;
                        }
                    }).addTo(map);

                }

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

                function latLngsInBounds(latLngs, bounds){
                    return _.some(latLngs, function (latLng) { return bounds.contains(latLng); } );
                }

                function polygonIntersectsBounds(polygon, bounds){
                    return bounds.intersects(polygon.getBounds()) && latLngsInBounds(polygon.getLatLngs(), bounds);
                }

                function getMapCentrePolygon(){
                    return leafletPip.pointInLayer(map.getCenter(), layers.regions, true)[0];
                }
            }
        }
    })

    .directive('acMapDrawer', function () {
        return {
            template:   '<div class="panel panel-default">' +
                            '<div class="panel-heading">' +
                                '<h3 class="panel-title">{{ region.polygon.feature.properties.name }}</h3>' +
                            '</div>' +
                            '<div class="panel-body" ng-transclude>' +
                            '</div>' +
                            '<div class="panel-footer">' +
                                '<dl>' +
                                    '<dt>Date Issued:<dt>' +
                                    '<dd>{{ region.forecast.dateIssued }}<dd>' +
                                    '<dt>Valid Until<dt>' +
                                    '<dd>{{ region.forecast.validUntil }}<dd>' +
                                '</dl>' +
                            '</div>' +
                        '</div>',
            replace: true,
            transclude: true,
            scope: {
                region: '='
            },
            link: function ($scope, el, attrs) {
                
            }
        }
    });
