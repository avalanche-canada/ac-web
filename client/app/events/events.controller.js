'use strict';

angular.module('avalancheCanadaApp')
  .controller('EventsCtrl', function ($scope, Prismic, $log, $stateParams, urlBuilder) {
    $scope.url = urlBuilder.get();
    var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD');

    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        var query = '[:d = at(document.type, "event")]';
        query    += '[:d = date.after(my.event.start_date,"'+yesterday+'")]';
        if($stateParams.tag){
            query += '[:d = any(document.tags, ["'+$stateParams.tag+'"])]';
        }

        $log.debug('[' + query + ']');
        ctx.api.form('everything').query('[' + query + ']')
            .orderings('[my.event.start_date]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting events from prismic');
            }

            else {
                var events = documents.results;
                $scope.events = events;
                $scope.featured = null;

                if (documents.total_pages > 1){
                    $scope.paginationRange = _.range(1, documents.total_pages+1);
                }

                query += '[:d = any(document.tags, ["featured"])]';
                $log.debug('[' + query + ']');
                ctx.api.form('everything').query('[' + query + ']')
                                            .orderings('[my.event.start_date]')
                                                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting featured event from prismic');
                    }
                    else {

                        if (documents.results.length > 0){
                            var featured = documents.results[0];
                            var updated = [];

                            _.forEach(events, function(val){
                                if (featured.id && val.id !== featured.id){
                                    updated.push(val);
                                }
                            });

                            $scope.events = updated;
                            $scope.featured = featured;
                        }
                    }
                });
            }

        });
    });

  });
