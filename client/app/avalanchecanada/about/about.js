'use strict';





angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.about', {
        url: '^/about',
        templateUrl: 'app/avalanchecanada/about/about.html',
        resolve:{
            overview: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('about-overview').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            board: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('about-board').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            awards: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('about-awards').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            vision: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('about-vision').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            contact: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('about-contact').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            staff: function($q, Prismic){
                var deferred = $q.defer();

                Prismic.ctx().then(function(ctx){
                    ctx.api.form('everything')
                        .query('[[:d = at(document.type, "staff")]]')
                            .ref(ctx.ref).submit(function(err, doc){
                                if (err) {
                                    $log.error('error getting events from prismic');
                                }
                                else {
                                    deferred.resolve(doc.results);
                                }
                        });
                });
                return deferred.promise;
            }
        },
        controller: 'AboutCtrl',
      })
      .state('ac.terms', {
        url: '^/tou',
        templateUrl: 'app/avalanchecanada/about/tou.html',
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
  })
.controller('AboutCtrl', function ($scope, $anchorScroll, $timeout, Prismic, overview, board, awards, vision, contact, staff) {
    $scope.overview = overview;
    $scope.board    = board;
    $scope.awards   = awards;
    $scope.vision   = vision;
    $scope.contact  = contact;
    $scope.staff    = staff;

    //! once rendered call anchor scroll
    $timeout($anchorScroll, 0, false);

});

