'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.training', {
        url: '^/training',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl',
        resolve:{
            overview: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-overview').then(function(doc){
                        deferred.resolve(doc.getStructuredText('learn.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            crs: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-crs').then(function(doc){
                        deferred.resolve(doc.getStructuredText('learn.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            ast2: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-ast2').then(function(doc){
                        deferred.resolve(doc.getStructuredText('learn.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            ast1: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-ast1').then(function(doc){
                        deferred.resolve(doc.getStructuredText('learn.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            primer: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-primer').then(function(doc){
                        deferred.resolve(doc.getStructuredText('learn.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            }
        }
      });
  })

  .controller('TrainingCtrl', function ($scope, Prismic, $stateParams, $location, $anchorScroll, $timeout, overview, crs, ast2, ast1, primer) {
        $scope.overview = overview;
        $scope.crs      = crs;
        $scope.ast2     = ast2;
        $scope.ast1     = ast1;
        $scope.primer   = primer;
        $timeout($anchorScroll, 0, false);
  })
;
