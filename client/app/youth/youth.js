'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.youth', {
        url: '^/youth',
        templateUrl: 'app/youth/youth.html',
        controller: 'YouthCtrl'
      });
  })
  .controller('YouthCtrl', function ($scope , Prismic, $log) {

        $scope.sections = ['powerpoints','photo','video','map','internet','handout','activities','ast','newsletter'];
        var resourceList = {};

        Prismic.ctx().then(function(ctx){

            $scope.sections.forEach(function(elm){
                var query  = '[[:d = any(document.type, ["resource"])][:d = any(document.tags, ["youth"])][:d = any(document.tags, ["'+elm+'"])]]';
                $log.info(query);
                ctx.api.form('everything').query(query)
                        .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting sponsor from prismic');
                    }
                    else {
                        resourceList[elm] = documents.results;
                    }
                });
            });
            $scope.resourceList = resourceList;


            Prismic.bookmark('youth-overview').then(function(doc){
                    $scope.overview = doc.getStructuredText('generic.body').asHtml(ctx);
            });

             Prismic.bookmark('youth-programs').then(function(doc){
                    $scope.programs = doc.getStructuredText('generic.body').asHtml(ctx);
            });

             Prismic.bookmark('youth-resource-text').then(function(doc){
                    $scope.resources = doc.getStructuredText('generic.body').asHtml(ctx);
            });

            Prismic.bookmark('youth-curriculum').then(function(doc){
                    $scope.curriculum = doc.getStructuredText('generic.body').asHtml(ctx);
            });

        });
  })
;
