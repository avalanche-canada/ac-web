'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.weather', {
        url: '^/weather',
        templateUrl: 'app/weather/weather.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {

                //! \todo decrement index to show previous forecasts
                $scope.index = 0;

                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;
                    var query = '[[:d = at(document.type, "weather-forecast")]]';
                    ctx.api.form('everything').query(query)
                                                .orderings('[my.weather-forecast.date desc]')
                                                    .ref(ctx.ref).submit(function(err, documents){
                        if (err) {
                            $log.error('error getting blogs from prismic');
                        }
                        else {
                            $scope.forecastContent = documents.results[$scope.index];
                        }
                    });

                });
            }]
      });

  });

