'use strict';

angular.module('avalancheCanadaApp')
  .controller('ForecastsCtrl', function ($scope, $stateParams, acForecast) {
    $scope.region = $stateParams.region;

    acForecast.fetch().then(function(regionData){
        $scope.regionDefinition = regionData;
    });

  });
