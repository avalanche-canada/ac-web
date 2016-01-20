
'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.page', {
        url: '^/page/:bookmark',
        templateUrl: 'app/avalanchecanada/page/page.html',
        controller: 'PageCtrl',
        resolve:{
            page: function($q, $stateParams, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    console.log(Prismic);
                    Prismic.bookmark($stateParams.bookmark).then(function(doc){
                        deferred.resolve({
                            title: doc.getText('generic.title'),
                            body:  doc.getStructuredText('generic.body').asHtml(ctx),
                        });
                    });
                });
                return deferred.promise;
            }
        }
      });
});
