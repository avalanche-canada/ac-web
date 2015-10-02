'use strict';

angular.module('avalancheCanadaApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.gear', {
        url: '^/gear',
        templateUrl: 'app/avalanchecanada/gear/gear.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('gear').then(function(doc){
                            $scope.content = doc.getStructuredText('generic.body').asHtml(ctx);
                    });
                });
            }]
      });
  });
