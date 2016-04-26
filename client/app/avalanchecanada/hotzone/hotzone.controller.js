'use strict';

angular.module('avalancheCanadaApp')
  .controller('HotZoneCtrl', function ($scope, acForecast) {
        acForecast.fetch().then(function (forecastRegions) {
            $scope.hotzones = _.filter(forecastRegions.features, function (feature) {
                return feature.properties.type === 'hotzone';
            });
        });
  });
