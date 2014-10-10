'use strict';

angular.module('avalancheCanadaApp')
  .controller('BlogItemCtrl', function ($scope, Prismic, $log, $routeParams, $location) {

    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        Prismic.document($routeParams.id).then(function(doc){
            if (doc.slug === $routeParams.slug) {
                    $scope.documentHtml =  doc.getStructuredText('blog.body').asHtml(ctx);//doc.asHtml(ctx);
            }
            else if (doc.slugs.indexOf($routeParams.slug) >= 0) {
                $location.path('/blogs/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $location.path('/');
            }
        });
    });

  });
