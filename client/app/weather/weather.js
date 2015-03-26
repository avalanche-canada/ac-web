'use strict';

angular.module('avalancheCanadaApp')
.directive('textAndImage', function() {
  return {
    restrict: 'E',
    scope: {
      image:'=image',
      text:'=text',
    },
    transclude: true,
    templateUrl: 'app/weather/textAndImage.html'
  };
})
.config(function ($stateProvider) {
    $stateProvider
        .state('ac.weather', {
            url: '^/weather',
            templateUrl: 'app/weather/weather.html',
            resolve:{
                weatherForecast: function($q, $log, Prismic){
                    var deferred = $q.defer();
                    Prismic.ctx().then(function(ctx){
                        var query = '[[:d = at(document.type, "weather-forecast")]]';
                        ctx.api.form('everything').query(query)
                                                    .orderings('[my.weather-forecast.date desc]')
                                                        .ref(ctx.ref).submit(function(err, documents){
                            if (err) {
                                $log.error('error getting blogs from prismic');
                            }
                            else {
                                deferred.resolve(documents);
                            }
                        });
                    });
                    return deferred.promise;
                }
            },
            controller: 'WeatherCtrl'
        });
})
.controller('WeatherCtrl',  function ($scope, weatherForecast, $rootScope) {
    $scope.index = 0;
    $scope.forecastContent = weatherForecast.results[$scope.index];
    $rootScope.ogTags  = [ {type: 'title', value: $scope.forecastContent.getText('weather-forecast.headline')},
             {type: 'image', value: $scope.forecastContent.getImageView('weather-forecast.day1-image1', 'main')? $scope.forecastContent.getImageView('weather-forecast.day1-image1', 'main').url : 'http://www.avalanche.ca/assets/avalanche_canada.png'},
             {type: 'description', value: $scope.forecastContent.getStructuredText('weather-forecast.synopsis').asText()} ];
    $scope.calculateDay = function (base, add) { return moment(base).add(add,'day');};
});




