'use strict';

angular.module('avalancheCanadaApp')
  .controller('NewsCtrl', function ($scope, Prismic, $log) {

     Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        var query = '[[:d = at(document.type, "news")]]';
        ctx.api.form('everything').query(query)
            .orderings('[my.news.date]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news events from prismic');
            }

            else {
                var results = documents.results;
                query = '[[:d = at(document.type, "news")] [:d = any(document.tags, ["featured"])]]';
                ctx.api.form('everything').query(query)
                                            .orderings('[my.news.date]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured news from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        var news = [];

                        _.forEach(results, function(val){
                            if (featured.id && val.id !== featured.id){
                                news.push(val);
                            }
                        });

                        $scope.news = news;
                        $scope.featured = featured;
                    }
                });
            }

            /*else {
                $scope.documents = documents;
                // Angular doesn't repeat over collections created on the fly, so we have to create it here
                if (documents.total_pages > 1){
                    $scope.paginationRange = _.range(1, documents.total_pages+1);
                }
            }*/
        });
    });

  });
