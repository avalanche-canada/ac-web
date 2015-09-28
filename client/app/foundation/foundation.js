'use strict';

angular.module('foundation',[
        'ngCookies',
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
        templateUrl: 'app/foundation/foundation.html',
        data: {
          ogTitle: 'Avalanche Canada Foundation',
          ogImage: 'http://www.avalanche.ca/assets/avalanche_canada.png',
          ogDescription: 'Avalanche Canada is a non-government, not-for-profit organization dedicated to public avalanche safety. We issue daily avalanche forecasts throughout the winter for much of the mountainous regions of western Canada, providing this free information via our website and our app, Avalanche Canada Mobile. We also coordinate and deliver avalanche awareness and education programs, provide curriculum and support to instructors of Avalanche Canada training programs, act as a central point-of-contact for avalanche information, and work closely with many different avalanche research projects, both at home and abroad.'
        }
      })
      .state('foundation.intro', {
        url: '',
        templateUrl: 'app/foundation/intro.html',
        controller:  ['$scope', '$rootScope', '$state',
            function ($scope, $rootScope,$state) {

                $scope.env = $rootScope.env;
                var width = window.innerWidth;
                var height = window.innerHeight;
                $scope.myInterval = 5000;
                $scope.slides = [{
                          //image: 'http://avalanche-canada.imgix.net/photos/forecast.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          image:'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421709792/Foundation/cac_display_JD-Hare_edited_120404.jpg',
                          credits:'Chris Christie',
                          text1: 'Raising money for <a href="/">Avalanche Canada<a>',
                          text2: '&nbsp;'
                        },
                        {
                          //image: 'http://avalanche-canada.imgix.net/photos/foundation_intro.png?fit=crop&h=' + height + '&q=80&w='+width,
                          image:'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421536478/Foundation/DSC_0090.jpg',
                          credits:'Silas Patterson',
                          text1: 'Your donations help <a href="'+$scope.env.DOMAIN+'">Avalanche Canada<a>',
                          text2: 'provide daily public avalanche forecasts'
                        },

                        {
                          //image: 'http://avalanche-canada.imgix.net/photos/education.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          image:'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421536183/Foundation/PC230028.jpg',
                          credits:'Kirstie Simpson',
                          text1: 'Your donations help <a href="'+$scope.env.DOMAIN+'">Avalanche Canada<a>',
                          text2: 'develop and coordinate public avalanche education'
                        },
                        {
                          //image: 'http://avalanche-canada.imgix.net/photos/youth.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          image: 'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421536253/Foundation/DSC_7016.jpg',
                          credits:'Steve Ruskay',
                          text1: 'Your donations help <a href="'+$scope.env.DOMAIN+'">Avalanche Canada<a>',
                          text2: 'deliver youth awareness and training seminars'
                        },
                        {
                          //image: 'http://avalanche-canada.imgix.net/photos/sled2.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          image:'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421536269/Foundation/sled2.jpg',
                          credits:'Jonathan Reich',
                          text1: 'Your donations help <a href="'+$scope.env.DOMAIN+'">Avalanche Canada<a>',
                          text2: 'create and deliver programs for specific user groups'
                        },
                        {
                          //image: 'http://avalanche-canada.imgix.net/photos/research.jpg?fit=crop&h=' + height + '&q=80&w='+width,
                          image:'http://res.cloudinary.com/avalanche-ca/image/upload/c_fill,h_'+height+',w_'+width+'/v1421537800/Foundation/research.jpg',
                          credits:'Raven Eye Photography',
                          text1: 'Your donations help <a href="'+$scope.env.DOMAIN+'">Avalanche Canada<a>',
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
        controller: 'FoundationAboutCtrl',
        resolve:{
            mission: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('foundation-about-mission').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            reports: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('foundation-about-reports').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            board: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('foundation-about-board').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            honourary: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('foundation-directors-honourary').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },
            contact: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('foundation-contact').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            }
        }
      })
      .state('foundation.programs', {
        url: '/programs',
        templateUrl: 'app/foundation/programs.html',
        controller: 'FoundationProgramsCtrl',
        resolve:{
            hincks: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-hincks').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            kelly: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-kelly').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            avalancheCanada: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-ac').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            other: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-other').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            shea: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-shea').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            hodgson: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-hodgson').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            memorialFunds: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-memorial-funds').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            },

            memorialDonations: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(){
                    Prismic.bookmark('foundation-programs-memorial-donations').then(function(doc){
                        deferred.resolve(doc);
                    });
                });
                return deferred.promise;
            }
        }
      })
      .state('foundation.contributors', {
        url: '/donors',
        templateUrl: 'app/foundation/contributors.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {


                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;

                    Prismic.bookmark('foundation-contributors-donors').then(function(doc){
                            $scope.donors = doc.getStructuredText('generic.body').asHtml(ctx);
                    });

                });
            }]
      })
      .state('foundation.eventsponsor', {
        url: '/eventsponsor',
        templateUrl: 'app/foundation/eventsponsor.html',
        controller: ['Prismic', '$scope',
            function (Prismic, $scope) {

                Prismic.ctx().then(function(ctx){

                    $scope.ctx = ctx;
                    $scope.whistler = [];
                    $scope.calgary  = [];

                    Prismic.bookmark('foundation-calgary-event-sponsor').then(function(doc){
                            $scope.calgaryText = doc; //.getStructuredText('generic.body').asHtml(ctx);
                    });

                    Prismic.bookmark('foundation-whistler-event-sponsor').then(function(doc){
                            $scope.whistlerText = doc; //.getStructuredText('generic.body').asHtml(ctx);
                    });

                    var page = 1;
                    var getData = function getData(){
                        var query = '[:d = at(document.type, "foundation-event-sponsor")]';

                        ctx.api.form('everything').query('[' + query + ']')
                            .page(page)
                              .ref(ctx.ref).submit(function(err, doc){
                                doc.results.forEach(function(item){
                                    if(item.tags.indexOf('Whistler Event Sponsor') > -1){
                                        $scope.whistler.push(item);
                                    }
                                    if(item.tags.indexOf('Calgary Event Sponsor') > -1){
                                        $scope.calgary.push(item);
                                    }

                                    if (page <= doc.total_pages){
                                        page = page + 1;
                                        getData();
                                    }
                                });
                        });
                    };
                    getData();

                });
            }]
      });
})
.controller('FoundationAboutCtrl', function ($anchorScroll, $timeout, $scope, mission, reports, board, honourary, contact) {
    $scope.mission = mission;
    $scope.reports = reports;
    $scope.board   = board;
    $scope.honourary = honourary;
    $scope.contact = contact;
    $timeout($anchorScroll, 0, false);
})
.controller('FoundationProgramsCtrl', function ($anchorScroll, $timeout, $scope, hincks, kelly, avalancheCanada,other,shea, hodgson, memorialDonations, memorialFunds) {
    $scope.hincks = hincks;
    $scope.kelly = kelly;
    $scope.ac   = avalancheCanada;
    $scope.other = other;
    $scope.shea = shea;
    $scope.hodgson = hodgson;
    $scope.memorialDonations = memorialDonations;
    $scope.memorialFunds = memorialFunds;

    $timeout($anchorScroll, 0, false);
});
