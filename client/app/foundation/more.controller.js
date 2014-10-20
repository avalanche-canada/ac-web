
'use strict';

angular.module('foundation')

  .controller('FoundationMoreCtrl', function ($scope, $rootScope, $location, Prismic, $log) {

    $scope.showIntro = function () {
        $rootScope.pageClass = 'page-up';
        $location.path('/foundation');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["foundation"])]]')
                                    .orderings('[news.date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news from prismic');
            }
            else {
                var news = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["foundation"])] [:d = any(document.tags, ["featured"])]]')
                                            .orderings('[news.date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        $scope.news = [];

                        _.forEach(news, function(val){
                            if (val.id !== featured.id){
                                $scope.news.push(val);
                            }
                        });

                        $scope.news = $scope.news.slice(0,2);
                        $scope.featuredNews = featured;
                    }
                });
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["foundation"])]]')
                                    .orderings('[event.start_date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                var events = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["foundation"])] [:d = any(document.tags, ["featured"])]]')
                                              .orderings('[event.start_date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured events from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        $scope.events = [];

                        _.forEach(events, function(val){
                            if (val.id !== featured.id){
                                $scope.events.push(val);
                            }
                        });

                        $scope.events = $scope.events.slice(0,2);
                        $scope.featuredEvent = featured;
                    }
                });
            }
        });


    });


  });

