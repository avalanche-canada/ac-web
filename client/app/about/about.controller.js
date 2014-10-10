'use strict';

angular.module('avalancheCanadaApp')
  .controller('AboutCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        Prismic.bookmark("about").then(function(document){
                $scope.documentHtml = document.asHtml(ctx);
        });


    });

  });
