'use strict';

angular.module('avalancheCanadaApp')
  .controller('ForecastsCtrl', function ($scope, $stateParams, acForecast, AC_API_ROOT_URL) {
    $scope.region = $stateParams.region;
    $scope.api = AC_API_ROOT_URL;

    acForecast.fetch().then(function(regionData){
        $scope.regionDefinition = regionData;
        acForecast.getOne($scope.region).then (function(forecast)
        {
            $scope.forecast = forecast;
        });
    });

  });
