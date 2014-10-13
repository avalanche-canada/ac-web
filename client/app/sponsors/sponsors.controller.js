'use strict';

angular.module('avalancheCanadaApp')
  .controller('SponsorsCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark('sponsors').then(function(document){
                $scope.documentHtml = document.asHtml(ctx);
        });


    });

  });
