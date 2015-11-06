angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {

    $stateProvider
      .state('ac.minOverview', {
        url: '^/mountain-information-network',
        templateUrl: 'app/avalanchecanada/submit/min-overview.html',
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
.controller('MINLandingCtrl', function($q, $location, $window, prsmBookmark){
  var that = this;
  prsmBookmark('min-landing').then(function(content){
    that.url = $window.encodeURIComponent($location.absUrl());
    that.title = content.getText('generic.title');
    that.body  = content.getStructuredText('generic.body').asHtml(null);
  });
});
