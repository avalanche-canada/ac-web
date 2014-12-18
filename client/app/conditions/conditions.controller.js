'use strict';

angular.module('avalancheCanadaApp')
  .controller('ConditionsCtrl', function ($scope, Prismic, $log, urlBuilder) {
    $scope.url = urlBuilder.get();
     Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

       /* var getDate = function(item){
            return moment.utc(item.getDate('conditions-summary.date')).format('YYYY-MM-DD') ;
        };

        $scope.date = getDate;
        $scope.generateLink = function(item){
            var date = getDate(item);
            var str = '#/conditions/' + date + '/' + item.getText('conditions-summary.type');
            return str;
        };*/

        var query = '[[:d = at(document.type, "conditions-summary")]]';
        ctx.api.form('everything').query(query)
            .orderings('[my.conditions-summary.date desc]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting conditions-summary events from prismic');
            }
            else {
                $scope.conditions = documents.results;
                // Angular doesn't repeat over collections created on the fly, so we have to create it here
                if (documents.total_pages > 1){
                    $scope.paginationRange = _.range(1, documents.total_pages+1);
                }
            }
        });
    });

  });
