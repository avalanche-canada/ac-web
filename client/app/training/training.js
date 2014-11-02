'use strict';

angular.module('avalancheCanadaApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.training-overview', {
        url: '^/training/overview',
        templateUrl: 'app/training/training.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-overview').then(function(doc){
                            $scope.content = doc.getStructuredText('learn.body').asHtml(ctx);
                    });
                });
            }]
      })
      .state('ac.training-primer', {
        url: '^/training/online-primer',
        templateUrl: 'app/training/training.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-primer').then(function(doc){
                            $scope.content = doc.getStructuredText('learn.body').asHtml(ctx);
                    });
                });
            }]
      })
      .state('ac.training-ast1', {
        url: '^/training/ast1',
        templateUrl: 'app/training/training.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-ast1').then(function(doc){
                            $scope.content = doc.getStructuredText('learn.body').asHtml(ctx);
                    });
                });
            }]
      })
      .state('ac.training-ast2', {
        url: '^/training/ast2',
        templateUrl: 'app/training/training.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-ast2').then(function(doc){
                            $scope.content = doc.getStructuredText('learn.body').asHtml(ctx);
                    });
                });
            }]
      })
       .state('ac.training-crs', {
        url: '^/training/crs',
        templateUrl: 'app/training/training.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('training-crs').then(function(doc){
                            $scope.content = doc.getStructuredText('learn.body').asHtml(ctx);
                    });
                });
            }]
      })
      ;
  });
