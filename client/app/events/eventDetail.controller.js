'use strict';

angular.module('avalancheCanadaApp')
  .controller('EventDetailCtrl', function ($scope, Prismic, $log, $stateParams, $location, urlBuilder) {
    $scope.url = urlBuilder.get();
    Prismic.ctx().then(function(ctx) {
        $scope.ctx = ctx;
        Prismic.document($stateParams.id).then(function(doc){
            if (doc.slug === $stateParams.slug) {
                    $scope.event = doc; //doc.asHtml(ctx);
            }
            else if (doc.slugs.indexOf($stateParams.slug) >= 0) {
                $location.path('/events/'+doc.id+'/'+doc.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $location.path('/');
            }
        });
    });

  });
