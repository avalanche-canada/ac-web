'use strict';

angular.module('avalancheCanadaApp')
  .controller('ForecastsCtrl', function ($scope, $rootScope, $filter, $state, $stateParams, $sanitize, acForecast, AC_API_ROOT_URL, Prismic, urlBuilder) {
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
        acForecast.getOne($scope.region).then(function(forecast)
        {
            $scope.forecast = forecast;
            $rootScope.ogTags = [ 
              {type: 'title',       value: forecast.bulletinTitle +' Avalanche Forecast' },
              {type: 'image',       value: 'https://res.cloudinary.com/avalanche-ca/image/upload/c_pad,g_center,h_315,w_600/v1413919754/logos/avalanche_canada_left_quqmls.jpg'},
              {type: 'description', value: 'Get the latest forecast for the ' + forecast.bulletinTitle + ' region'},
              {type: 'ttl',         value: 60*60*6 /* keep pages for 6h */}
            ];
        }).catch(function(){
          $state.go('ac.404');
        });
    });

  });
