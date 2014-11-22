'use strict';

angular.module('avalancheCanadaApp')
  .controller('AboutCtrl', function ($scope, Prismic) {

    Prismic.ctx().then(function(ctx){

        /*$scope.overview   = '',
            $scope.board  = '',
            $scope.awards = '',
            $scope.board  = '',
            $scope.vision = '';*/

        $scope.ctx = ctx;

        Prismic.bookmark('about-overview').then(function(doc){
                $scope.overview = doc.getStructuredText('generic.body').asHtml(ctx);
            });

        Prismic.bookmark('about-board').then(function(doc){
                $scope.board = doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('about-awards').then(function(doc){
                $scope.awards =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('about-board').then(function(doc){
                $scope.board =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('about-vision').then(function(doc){
                $scope.vision =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        Prismic.bookmark('about-contact').then(function(doc){
                $scope.contact =  doc.getStructuredText('generic.body').asHtml(ctx);
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "staff")]]').ref(ctx.ref).submit(function(err, doc){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                $scope.staff = doc.results;
            }
        });

    });

  });
