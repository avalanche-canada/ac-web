'use strict';



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

.service('PrsmBookmark', function($q, Prismic){
  return function PrsmBookmark(id) {
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
.controller('MINLandingCtrl', function($q, $location, $window, PrsmBookmark){
  var that = this;
  PrsmBookmark('min-landing').then(function(content){
    that.url = $window.encodeURIComponent($location.absUrl());
    that.title = content.getText('generic.title');
    that.body  = content.getStructuredText('generic.body').asHtml(null);
  });
})

.controller('SubmitCtrl', function () {
})
;

