'use strict';

angular.module('foundation',[
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'constants',
        'ngSanitize',
        'prismic.io'])

/* hack to disable nganimate which breaks the carousel  http://plnkr.co/edit/8HfZCaTOIeAesKVFSFpj?p=preview https://github.com/angular-ui/bootstrap/issues/1350*/
    .directive('disableAnimation', function($animate){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){
                $attrs.$observe('disableAnimation', function(value){
                    $animate.enabled(!value, $element);
                });
            }
        };
    })

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
        controller:  ['$scope', '$rootScope', '$state',
            function ($scope, $rootScope,$state) {

                var width = window.innerWidth;
                var height = window.innerHeight;
                $scope.myInterval = 5000;
                $scope.slides = [{
                          image: 'http://avalanche-canada.imgix.net/photos/forecast.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Raising money for <a hre="/">Avalanche Canada<a>',
                          text2: '&nbsp;'
                        },
                        {
                          image: 'http://avalanche-canada.imgix.net/photos/foundation_intro.png?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Your donations help <a hre="/">Avalanche Canada<a>',
                          text2: 'provide daily public avalanche forecasts'
                        },

                        {
                          image: 'http://avalanche-canada.imgix.net/photos/education.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Your donations help <a hre="/">Avalanche Canada<a>',
                          text2: 'develop and coordinate public avalanche education'
                        },
                        {
                          image: 'http://avalanche-canada.imgix.net/photos/youth.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Your donations help <a hre="/">Avalanche Canada<a>',
                          text2: 'deliver youth awareness and training seminars'
                        },
                        {
                          image: 'http://avalanche-canada.imgix.net/photos/sled2.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Your donations help <a hre="/">Avalanche Canada<a>',
                          text2: 'create and deliver programs for specific user groups'
                        },
                        {
                          image: 'http://avalanche-canada.imgix.net/photos/research.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          text1: 'Your donations help <a hre="/">Avalanche Canada<a>',
                          text2: 'contribute to snow safety research'
                        }];

                $scope.showMore = function () {
                    $rootScope.pageClass = 'page-down';
                     $state.go('foundation.more');
                };
            }]
      })
      .state('foundation.more', {
        url: '/more',
        templateUrl: 'app/foundation/more.html',
        controller: 'FoundationMoreCtrl'
      })
      .state('foundation.news', {
        url: '/news',
        templateUrl: 'app/foundation/more.html',
        controller: 'FoundationMoreCtrl'
      })
      .state('foundation.events', {
        url: '/events',
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

                    Prismic.bookmark('foundation-directors-honourary').then(function(doc){
                            $scope.honourary =  doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]

      })
      .state('foundation.programs', {
        url: '/programs',
        templateUrl: 'app/foundation/programs.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {

                $scope.panel = true;

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
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {


                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('foundation-contributors-donors').then(function(doc){
                            $scope.donors = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-contributors-event').then(function(doc){
                            $scope.eventSponsor = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]

      });

  });
