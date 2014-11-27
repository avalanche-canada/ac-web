'use strict';

angular.module('avalancheCanadaApp')

  .controller('MoreCtrl', function ($scope, $rootScope, $state, Prismic, $log, sledPage) {

    $scope.sledPage = sledPage;

    //! does not handle resize should use ac-components breakpoints function
    var page = {'width': window.innerWidth, 'height' : window.innerHeight};
    $scope.video = {'width': 1012, 'height' : 555};

    if(page.width < 480 ) {
        $scope.video = {'width': 320, 'height' : 180};
    } else if(page.width >= 480 && page.width < 600) {
        $scope.video = {'width': 480, 'height' : 270};
    } else if(page.width >= 600 && page.width < 1025) {
        $scope.video = {'width': 640 , 'height' : 360};
    }

    $scope.showMap = function () {
        $rootScope.pageClass = 'page-up';
        $state.go('ac.map');
        //$location.path('/');
    };

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD') ;
        var sledQuery = sledPage ? '[:d = any(document.tags, ["Snowmobiler"])]' : '' ;

        var queryStr = '[[:d = at(document.type, "news")]' + sledQuery + ']';
        ctx.api.form('everything').query(queryStr)
                                    .orderings('[my.news.date desc]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news from prismic');
            }
            else {
                var news = documents.results;
                queryStr = '[[:d = at(document.type, "news")] [:d = any(document.tags, ["featured"])]' + sledQuery + ']';
                $log.debug(queryStr);
                ctx.api.form('everything').query(queryStr)
                                            .orderings('[my.news.date desc]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        $scope.news = [];

                        _.forEach(news, function(val){
                            if (featured.id && val.id !== featured.id){
                                $scope.news.push(val);
                            }
                        });

                        $scope.news = $scope.news.slice(0,3);
                        $scope.featuredNews = featured;
                    }
                });
            }
        });
        queryStr = '[[:d = at(document.type, "event")] [:d = date.after(my.event.start_date, "'+yesterday+'")] ' + sledQuery + ']';
        $log.debug(queryStr);
        ctx.api.form('everything').query(queryStr)
                                    .orderings('[my.event.start_date]')
                                        .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }
            else {
                var events = documents.results;
                queryStr = '[[:d = at(document.type, "event")] [:d = any(document.tags, ["featured"])] [:d = date.after(my.event.start_date, "'+yesterday+'")]' + sledQuery + ']';
                $log.debug(queryStr);
                ctx.api.form('everything').query(queryStr)
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

