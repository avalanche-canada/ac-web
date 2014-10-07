'use strict';

angular.module('avalancheCanadaApp')
  .controller('NewsItemCtrl', function ($scope, Prismic, $log, $routeParams, $location) {

    Prismic.document($routeParams.id).then(function(document){
        if (document.slug === $routeParams.slug) {
            Prismic.ctx().then(function(ctx) {
                $scope.documentHtml = document.asHtml(ctx);
            })
        }
        else if (document.slugs.indexOf($routeParams.slug) >= 0) {
            $location.path('/news/'+document.id+'/'+document.slug);
        }
        else {
            // Should display some kind of error; will just redirect to / for now
            $location.path('/');
        }
    });

  });
