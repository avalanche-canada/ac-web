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

    var getWeather = function($q, $log, Prismic){
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
    $stateProvider
        .state('ac.weatherToday', {
            url: '^/weather',
            templateUrl: 'app/weather/weather.html',
            resolve:{
                weatherForecast: getWeather
            },
            controller: 'WeatherCtrl'
        })
        .state('ac.weather', {
            url: '^/weather/:date',
            templateUrl: 'app/weather/weather.html',
            resolve:{
                weatherForecast: getWeather
            },
            controller: 'WeatherCtrl'
        });
})
.controller('WeatherCtrl',  function ($scope, $log, weatherForecast, $location, $stateParams, $state) {

    $scope.calculateDay = function (base, add) { return moment(base).add(add,'day');};

    var filterByDate = function(date){
        var result = weatherForecast.results.find(function(element, index, array){
            return moment(date).isSame(element.getDate('weather-forecast.date'),'day');
        });

        if(result){
            $log.info('filter match found');
            $scope.forecastContent = result;
        }
        else{
            $log.info('no match found, showing latest. date searched for', date);
            $scope.forecastContent = weatherForecast.results[0];
        }
        $scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        $log.info('dt vs fxDate', $scope.dt, $scope.forecastContent.getDate('weather-forecast.date'));
    };


    //! Setup calendar
    $scope.tomorrow = moment().utc().add(1,'day').format('YYYY-MM-DD');
    $scope.opened  = false;
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.$watch('dt', function(newVal,oldVal){
        if(moment(newVal).isSame(oldVal, 'day')==false){
            //! the day selected is in pst and then converted incorrectly to UTC thus off by a day
            filterByDate(moment(newVal).subtract(1,'day').format('YYYY-MM-DD'));
            //$state.transitionTo ('ac.weather', {date: newVal}, { reload: false, notify: false });
        }
    });

    if($stateParams.date){
        filterByDate($stateParams.date);
    }
    else{
        $scope.forecastContent = weatherForecast.results[0];
        $scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        $scope.dt = moment($scope.forecastContent.getDate('weather-forecast.date')).add(1,'day');
    }

});




