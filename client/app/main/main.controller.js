
'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $state, Prismic, $log) {
    $scope.showMap = function () {
        $rootScope.pageClass = 'page-up';
        $state.go('ac.map');
        //$location.path('/');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        var date = new Date();
        var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();

        ctx.api.form('everything').query('[[:d = at(document.type, "news")]]')
                                    .orderings('[my.news.date]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news from prismic');
            }
            else {
                var news = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["featured"])]]')
                                            .orderings('[my.news.date]')
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

                        $scope.news = $scope.news.slice(0,3);
                        $scope.featuredNews = featured;
                    }
                });
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = date.after(my.event.start_date, "'+today+'")]]')
                                    .orderings('[my.event.start_date]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                var events = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["featured"])] [:d = date.after(my.event.start_date, "'+today+'")]]')
                                              .orderings('[my.event.start_date]')
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

                        $scope.events = $scope.events.slice(0,3);
                        $scope.featuredEvent = featured;
                    }
                });
            }
        });


        ctx.api.form('everything').query('[[:d = at(document.type, "blog")]]')
                                    .orderings('[my.blog.date]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting blogs from prismic');
            }
            else {
                $scope.blogs = documents.results.slice(0,1);
            }
        });


    });


  });

