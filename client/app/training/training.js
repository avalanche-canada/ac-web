'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.training', {
        url: '^/training',
        templateUrl: 'app/training/training.html',
        controller: 'TrainingCtrl'
      })
  })

  .controller('TrainingCtrl', function ($scope, Prismic, $stateParams, $location, $anchorScroll) {
        if ($stateParams.section)
        {
            $location.hash($stateParams.section);
            $anchorScroll();
        }

        Prismic.ctx().then(function(ctx){
            Prismic.bookmark('training-overview').then(function(doc){
                    $scope.overview = doc.getStructuredText('learn.body').asHtml(ctx);
            });

            Prismic.bookmark('training-crs').then(function(doc){
                    $scope.crs = doc.getStructuredText('learn.body').asHtml(ctx);
            });

             Prismic.bookmark('training-ast2').then(function(doc){
                    $scope.ast2 = doc.getStructuredText('learn.body').asHtml(ctx);
            });

             Prismic.bookmark('training-ast1').then(function(doc){
                    $scope.ast1 = doc.getStructuredText('learn.body').asHtml(ctx);
            });

             Prismic.bookmark('training-primer').then(function(doc){
                    $scope.primer = doc.getStructuredText('learn.body').asHtml(ctx);
            });
        });
  })
;
