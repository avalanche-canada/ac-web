'use strict';

function prsmBookmark(id) {
    console.log('its working!!!!');
    return function($q, Prismic){
        var deferred = $q.defer();
        Prismic.ctx().then(function(ctx){
            Prismic.bookmark(id).then(function(doc){
                deferred.resolve(doc);
            });
        });
        return deferred.promise;
    };
}

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ac.minOverview', {
        url: '^/mountain-information-network',
        templateUrl: 'app/avalanchecanada/submit/min-overview.html',
        resolve: {page: prsmBookmark('min-landing')},
        controllerAs: 'page',
        controller: function($q, $location, $window, page){
            this.url = $window.encodeURIComponent($location.absUrl());
            this.title = page.getText('generic.title');
            this.body  = page.getStructuredText('generic.body').asHtml(null);
        }
      });
  })
.controller('SubmitCtrl', function () {
});

