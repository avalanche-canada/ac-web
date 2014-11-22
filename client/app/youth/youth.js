'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.youth', {
        url: '^/youth',
        templateUrl: 'app/youth/youth.html',
        controller: 'YouthCtrl'
      });
  })

  .controller('YouthCtrl', function ($scope, Prismic) {

        Prismic.ctx().then(function(ctx){
            Prismic.bookmark('youth-overview').then(function(doc){
                    $scope.overview = doc.getStructuredText('generic.body').asHtml(ctx);
            });

             Prismic.bookmark('youth-programs').then(function(doc){
                    $scope.programs = doc.getStructuredText('generic.body').asHtml(ctx);
            });

             Prismic.bookmark('youth-resources').then(function(doc){
                    $scope.resources = doc.getStructuredText('generic.body').asHtml(ctx);
            });

            Prismic.bookmark('youth-curriculum').then(function(doc){
                    $scope.curriculum = doc.getStructuredText('generic.body').asHtml(ctx);
            });

        });
  })
;
