
'use strict';

angular.module('foundation')

  .controller('FoundationMoreCtrl', function ($scope, $rootScope, $state, Prismic, $log) {

    $scope.env = $rootScope.env;

    $scope.showIntro = function () {
        $rootScope.pageClass = 'page-up';
         $state.go('foundation.intro');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["Foundation"])]]')
                                    .orderings('[news.date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news from prismic');
            }
            else {
                var news = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "news")] [:d = any(document.tags, ["Foundation"])] [:d = any(document.tags, ["featured"])]]')
                                            .orderings('[news.date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news from prismic');
                    }
                    else {
                        var removeId = -1;
                        if(documents.results.length > 0) {
                          $scope.featuredNews = documents.results[0];
                          removeId = $scope.featuredNews.id;
                        }
                        $scope.news = _(news).filter(function(e){ return e.id !== removeId; }).take(3).value();
                    }
                });
            }
        });

        ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["Foundation"])]]')
                                    .orderings('[event.start_date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                var events = documents.results;
                ctx.api.form('everything').query('[[:d = at(document.type, "event")] [:d = any(document.tags, ["Foundation"])] [:d = any(document.tags, ["featured"])]]')
                                              .orderings('[event.start_date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured events from prismic');
                    }
                    else {
                        var removeId = -1;
                        if(documents.results.length > 0) {
                          $scope.featuredEvent = documents.results[0];
                          removeId = $scope.featuredEvent.id;
                        }

                        $scope.events =
                          _(events)
                            .filter(function(e){ return e.id !== removeId; })
                            .take(3)
                            .value();

                    }
                });
            }
        });


    });


  });

