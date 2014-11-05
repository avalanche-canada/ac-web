'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.forecasts', {
        url: '^/forecasts/{region}',
        templateUrl: 'app/forecasts/forecasts.html',
        controller: 'ForecastsCtrl'
      });
  });
