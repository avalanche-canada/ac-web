'use strict';

angular.module('avalancheCanadaApp')
  .controller('ForecastsCtrl', function ($scope, $stateParams, acForecast, AC_API_ROOT_URL, Prismic, urlBuilder) {
    $scope.region = $stateParams.region;
    $scope.api = AC_API_ROOT_URL;
    $scope.url = urlBuilder.get();

    $scope.sponsor = '';

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        var query  = '[[:d = at(document.type, "sponsor")] [:d = any(document.tags, ["forecast-sponsor"])]]';
        ctx.api.form('everything').query(query)
            .orderings('[my.blog.date desc]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting sponsor from prismic');
            }
            else {
                $scope.sponsor = documents.results[0];
            }
        });

        Prismic.bookmark('forecast-danger-rating').then(function(doc){
                $scope.dangerRating = doc;
        });

        Prismic.bookmark('forecast-disclaimer').then(function(doc){
                $scope.disclaimer = doc;
        });

        Prismic.bookmark('forecast-rss-instructions').then(function(doc){
                $scope.rss = doc;
        });

    });

    acForecast.fetch().then(function(regionData){
        $scope.regionDefinition = regionData;
        acForecast.getOne($scope.region).then (function(forecast)
        {
            $scope.forecast = forecast;
        });
    });

  });
