'use strict';

angular.module('avalancheCanadaApp')
  .controller('BlogsCtrl', function ($scope, Prismic, $log) {

     Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;

        var query = '[[:d = at(document.type, "blog")]]';
        ctx.api.form('everything').query(query).ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting blogs events from prismic');
            }
            else {
                $scope.blogs = documents.results;
                // Angular doesn't repeat over collections created on the fly, so we have to create it here
                if (documents.total_pages > 1){
                    $scope.paginationRange = _.range(1, documents.total_pages+1);
                }
            }
        });
    });

  });
