
'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $location, Prismic, $log) {
    $scope.showMap = function () {
        $rootScope.pageClass = 'page-up';
        $location.path('/');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        ctx.api.form('everything').query('[[:d = at(document.type, "news")]]').ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news events from prismic');
            }
            else {
                $scope.news = documents.results;
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["featured"])]]').ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting featured news events from prismic');
            }
            else {
                $scope.news_featured = documents.results[0];
                _.pull($scope.news, $scope.news_featured);
                $scope.news = $scope.news.slice(0,2);
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "events")]]').ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news events from prismic');
            }
            else {
                $scope.events = documents.results;
            }
        });


    });


  })
  .controller('MapCtrl', function ($scope) {
    $scope.scrollPage = function(){};
  });
