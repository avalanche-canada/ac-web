
'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $location, Prismic) {
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
