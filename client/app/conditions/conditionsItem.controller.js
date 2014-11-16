'use strict';

angular.module('avalancheCanadaApp')
  .controller('ConditionsItemCtrl', function ($scope, Prismic, $log, $stateParams, $location) {
    var date = $stateParams.date;
    var category = $stateParams.category;

    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;

        var query = '[[:d = at(document.type, "conditions-summary")] \
            [:d = at(my.conditions-summary.type, "'+category+'")] \
            [:d = at(my.conditions-summary.date, "'+date+'")]] ';
        $log.debug(query);
        ctx.api.form('everything').query(query)
            .orderings('[my.conditions-summary.date]')
                .ref(ctx.ref).submit(function(err, doc){

                    if (doc){
                        $scope.documentHtml = doc.results[0].getStructuredText('conditions-summary.body').asHtml(ctx);
                        $scope.date         = moment.utc(doc.results[0].getDate('conditions-summary.date')).format('YYYY-MM-DD');
                        $scope.category     = doc.results[0].getText('conditions-summary.type');
                    }
                    else {
                        // Should display some kind of error; will just redirect to / for now
                        $log.error('error document not found', err);
                        //$location.path('/');
                    }
        });
    });

  });
