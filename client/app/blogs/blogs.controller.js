'use strict';

angular.module('avalancheCanadaApp')
  .controller('BlogsCtrl', function ($scope, Prismic, $stateParams, $log) {

     var query = '';

     if($stateParams.category)
     {
        query = '[[:d = at(document.type, "blog")][:d = any(my.blog.category, ["'+$stateParams.category+'"])]]';
     }
     else
     {
        query = '[[:d = at(document.type, "blog")]]';
     }

     Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;


        ctx.api.form('everything').query(query)
            .orderings('[my.blog.date desc]')
                .ref(ctx.ref).submit(function(err, documents){
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
