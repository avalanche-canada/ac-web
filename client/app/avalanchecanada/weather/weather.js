'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider.state('ac.weather', {
        url: 'weather',
        templateUrl: 'app/avalanchecanada/weather/weather.html'
    });
})
.controller('WeatherCtrl',  function ($scope, auth) {
    $scope.isAuthenticated = auth.isAuthenticated;
});
