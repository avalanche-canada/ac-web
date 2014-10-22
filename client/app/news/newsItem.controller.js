'use strict';

angular.module('avalancheCanadaApp')
  .controller('NewsItemCtrl', function ($scope, Prismic, $log, $stateParams, $location) {

    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        Prismic.document($stateParams.id).then(function(doc){
            if (doc.slug === $stateParams.slug) {
                    $scope.documentHtml =  doc.getStructuredText('news.body').asHtml(ctx);//doc.asHtml(ctx);
            }
            else if (doc.slugs.indexOf($stateParams.slug) >= 0) {
                $location.path('/news/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $location.path('/');
            }
        });
    });

  });
