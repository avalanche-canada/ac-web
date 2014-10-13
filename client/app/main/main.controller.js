
'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $location, Prismic, $log) {
    $scope.showMap = function () {
        $rootScope.pageClass = 'page-up';
        $location.path('/');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        ctx.api.form('everything').query('[[:d = at(document.type, "news")]]')
                                    .orderings('[news.date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news events from prismic');
            }
            else {
                var news = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["featured"])]]')
                                            .orderings('[news.date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news events from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        $scope.news = [];

                        _.forEach(news, function(val, i){
                            if (val.id != featured.id){
                                $scope.news.push(val);
                            }
                        });

                        $scope.news = $scope.news.slice(0,2);
                        $scope.news_featured = featured;
                    }
                });
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "event")]]')
                                    .orderings('[event.start_date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                var events = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["featured"])]]')
                                              .orderings('[event.start_date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news events from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        $scope.events = [];

                        _.forEach(events, function(val, i){
                            if (val.id != featured.id){
                                $scope.events.push(val);
                            }
                        });

                        $scope.events = $scope.events.slice(0,2);
                        $scope.featured_event = featured;
                    }
                });
            }
        });


        ctx.api.form('everything').query('[[:d = at(document.type, "blog")]]')
                                    .orderings('[blog.date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                $scope.blogs = documents.results.slice(0,1);
            }
        });


    });


  })
  .controller('MapCtrl', function ($scope) {
    $scope.scrollPage = function(){};
  });
