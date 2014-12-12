'use strict';

angular.module('avalancheCanadaApp')
  .controller('EventsCtrl', function ($scope, Prismic, $log, urlBuilder) {
    $scope.url = urlBuilder.get();
    var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD');

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        var query = '[[:d = at(document.type, "event")][:d = date.after(my.event.start_date,"'+yesterday+'")]]';
        $log.debug(query);
        ctx.api.form('everything').query(query)
            .orderings('[my.event.start_date]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }

            else {
                var results = documents.results;
                if (documents.total_pages > 1){
                    $scope.paginationRange = _.range(1, documents.total_pages+1);
                }

                query = '[[:d = at(document.type, "event")] [:d = any(document.tags, ["featured"])][:d = date.after(my.event.start_date,"'+yesterday+'")]]';
                $log.debug(query);
                ctx.api.form('everything').query(query)
                                            .orderings('[my.event.start_date]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured event from prismic');
                    }
                    else {
                        var featured = documents.results[0];
                        var events = [];

                        _.forEach(results, function(val){
                            if (featured.id && val.id !== featured.id){
                                events.push(val);
                            }
                        });

                        $scope.events = events;
                        $scope.featured = featured;
                    }
                });
            }

        });
    });

  });
