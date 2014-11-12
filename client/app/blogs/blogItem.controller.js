'use strict';

angular.module('avalancheCanadaApp')
  .controller('BlogItemCtrl', function ($scope, Prismic, $log, $stateParams, $location) {

    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        Prismic.document($stateParams.id).then(function(doc){
            if (doc.slug === $stateParams.slug) {
                $scope.documentHtml =  doc.getStructuredText('blog.body').asHtml(ctx);//doc.asHtml(ctx);
            }
            else if (doc.slugs.indexOf($stateParams.slug) >= 0) {
                $location.path('/blogs/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $log.error('error document slug not found');
                $location.path('/');
            }
        });
    });

  });
