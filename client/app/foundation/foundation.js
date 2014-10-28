'use strict';

angular.module('avalancheCanadaApp')
 .config(function ($stateProvider) {

    $stateProvider
      .state('foundation', {
        abstract:true,
        url: '/foundation',
        templateUrl: 'app/foundation/foundation.html'
      })
      .state('foundation.intro', {
        url: '',
        templateUrl: 'app/foundation/intro.html',
        controller: 'FoundationIntroCtrl'
      })
      .state('foundation.more', {
        url: '/more',
        templateUrl: 'app/foundation/more.html',
        controller: 'FoundationMoreCtrl'
      })
      .state('foundation.about', {
        url: '/about',
        templateUrl: 'app/foundation/about.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {


                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('foundation-about-mission').then(function(doc){
                            $scope.mission = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-about-reports').then(function(doc){
                            $scope.reports = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-about-board').then(function(doc){
                            $scope.board =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-about-honorary').then(function(doc){
                            $scope.honorary =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]

      })
      .state('foundation.programs', {
        url: '/programs',
        templateUrl: 'app/foundation/programs.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {


                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('foundation-programs-hincks').then(function(doc){
                            $scope.hincks = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-kelly').then(function(doc){
                            $scope.kelly = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-ac').then(function(doc){
                            $scope.ac =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-shea').then(function(doc){
                            $scope.shea =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-hodgson').then(function(doc){
                            $scope.hodgson =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]

      })
      .state('foundation.contributors', {
        url: '/contributors',
        templateUrl: 'app/foundation/contributors.html',
        controller: ['Prismic', '$scope','$sce',
            function (Prismic, $scope, $sce) {


                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('foundation-programs-hincks').then(function(doc){
                            $scope.hincks = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-kelly').then(function(doc){
                            $scope.kelly = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-ac').then(function(doc){
                            $scope.ac =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-programs-shea').then(function(doc){
                            $scope.shea =  doc.getStructuredText('generic.body').asHtml(ctx)
                    });

                    Prismic.bookmark('foundation-programs-hodgson').then(function(doc){
                            $scope.hodgson =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]

      });

  });
