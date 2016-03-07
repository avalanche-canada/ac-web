'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('ac.minOverview', {
        url: '^/mountain-information-network',
        templateUrl: 'app/avalanchecanada/min/min-overview.html',
        controllerAs: 'page',
        controller: 'MINLandingCtrl'
      });

  })

.service('prsmBookmark', function($q, Prismic){
  return function prsmBookmark(id) {
    var deferred = $q.defer();

    Prismic.ctx().then(function(){
      Prismic.bookmark(id).then(function(doc){
        deferred.resolve(doc);
      });
    }).catch(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };
})
.controller('MINLandingCtrl', function($scope, $modal){
    $scope.playMobile = function() {
        $modal.open({
            animation: true,
            template: '<iframe src="https://player.vimeo.com/video/141111236" width="588" height="336" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
            windowClass: 'min-video-modal',
            //size: 'lg',
            //keyboard: false,
            //backdrop: 'static'
        });
    };

    $scope.playDesktop = function() {
        $modal.open({
            animation: true,
            template: '<iframe src="https://player.vimeo.com/video/151970678" width="588" height="336" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
            windowClass: 'min-video-modal',
        });
    };

});
