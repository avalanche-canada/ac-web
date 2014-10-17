'use strict';

angular.module('avalancheCanadaApp')
  .controller('SponsorsCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark('sponsor-associate').then(function(doc){
                $scope.associate =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-brand').then(function(doc){
                $scope.brand =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-founding').then(function(doc){
                $scope.founding =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-partner').then(function(doc){
                $scope.partner =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-programs').then(function(doc){
                $scope.programs =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('sponsor-supplier').then(function(doc){
                $scope.supplier =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

    });

  });
