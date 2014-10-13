'use strict';

angular.module('avalancheCanadaApp')
  .controller('CollaboratorsCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark("collaborators").then(function(document){
                $scope.documentHtml = document.asHtml(ctx);
        });


    });

  });
