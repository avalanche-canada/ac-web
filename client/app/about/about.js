'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.about', {
        url: '^/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('ac.terms', {
        url: '^/tou',
        templateUrl: 'app/about/tou.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {

                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('about-tou').then(function(doc){
                            $scope.tou = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('about-privacy').then(function(doc){
                            $scope.privacy = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]
      });
  });
