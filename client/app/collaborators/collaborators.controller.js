'use strict';

angular.module('avalancheCanadaApp')
  .controller('CollaboratorsCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark('collaborators-government').then(function(document){
                $scope.government = document.asHtml(ctx);
        });

        Prismic.bookmark('collaborators-other').then(function(document){
                $scope.other = document.asHtml(ctx);
        });


    });

  });
