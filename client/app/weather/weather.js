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
        .state('ac.weatherToday', {
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
        })
        .state('ac.weather', {
            url: '^/weather/:date',
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
.controller('WeatherCtrl',  function ($scope, weatherForecast, $location) {
    $scope.index = 0;
    $scope.forecastContent = weatherForecast.results[$scope.index];
    $scope.dt = weatherForecast.results[$scope.index].getDate('weather-forecast.date');
    $scope.opened  = false;
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.$watch('dt', function(newVal,oldVal){
        if(oldVal !== newVal){
            $location.url('/weather/'+moment(newVal).format('YY-MM-DD'));
        }
    });

    $scope.calculateDay = function (base, add) { return moment(base).add(add,'day');};
});




