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

    //! get all weather forecasts
    var getWeather = function($q, $log, Prismic){
        var results = [];
        var page   = 1;
        var deferred = $q.defer();
        //! recurcive function
        var queryPrimsic = function(){
            Prismic.ctx().then(function(ctx){
                var query = '[[:d = at(document.type, "weather-forecast")]]';
                ctx.api.form('everything').query(query)
                                            .pageSize(99)
                                                .page(page)
                                                    .orderings('[my.weather-forecast.date desc]')
                                                        .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting weather from prismic');
                    }
                    else {
                        results = results.concat(documents.results);

                        //! max records we can get from prismic is 100 so if there are multiple pages recurcively add them
                        if (page <= documents.total_pages){
                            page = page + 1;
                            queryPrimsic();
                        }
                        else{
                            deferred.resolve(results);
                        }
                    }
                });
            });
        };

        queryPrimsic();
        return deferred.promise;
    };

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
.controller('WeatherCtrl',  function ($scope, $log, weatherForecast, $rootScope, $location, $stateParams, $state) {



    $scope.calculateDay = function (base, add) { return moment(base).add(add,'day');};

    var filterByDate = function(date){
        var findForecast = function (element){
            return (moment(date).isSame(element.getDate('weather-forecast.date'),'day') &&
                    moment(date).isSame(element.getDate('weather-forecast.date'),'month') &&
                    moment(date).isSame(element.getDate('weather-forecast.date'),'year'));
        };

        var result = _.find(weatherForecast, findForecast);//weatherForecast.find(findForecast);

        if(result){
            $log.info('filter match found');
            $scope.forecastContent = result;
            $scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        }
        else{
            $log.info('no match found, showing latest forecast. date searched for=', date);
            $scope.forecastContent = weatherForecast[0];
            $scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        }

        $rootScope.ogTags  = [ {type: 'title', value: $scope.forecastContent.getText('weather-forecast.headline')},
             {type: 'image', value: $scope.forecastContent.getImageView('weather-forecast.day1-image1', 'main')? $scope.forecastContent.getImageView('weather-forecast.day1-image1', 'main').url : 'http://www.avalanche.ca/assets/avalanche_canada.png'},
             {type: 'description', value: $scope.forecastContent.getStructuredText('weather-forecast.synopsis').asText()} ];
        //$scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        //$log.info('dt vs fxDate', $scope.dt, $scope.forecastContent.getDate('weather-forecast.date'));
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

    if($stateParams.date){
        filterByDate(moment($stateParams.date).utc().format('YYYY-MM-DD'));
        $scope.dt = $stateParams.date;
    }
    else{
        $scope.forecastContent = weatherForecast[0];
        $scope.displayDate = $scope.forecastContent.getDate('weather-forecast.date');
        //! UTC to PST conversion
        $scope.dt = moment($scope.forecastContent.getDate('weather-forecast.date')).add(1,'day');
    }

    $scope.$watch('dt', function(newVal,oldVal){
        if(moment(newVal).isSame(oldVal, 'day')===false){
            //! the day selected is in pst and then converted incorrectly to UTC thus off by a day
            filterByDate(moment(newVal).subtract(1,'day').format('YYYY-MM-DD'));
            $state.transitionTo ('ac.weather', {date: moment(newVal).format('YYYY-MM-DD')}, { reload: false, notify: false });
        }
    });

});




