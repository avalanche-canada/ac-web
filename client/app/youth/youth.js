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

        $scope.tags =  []; //['powerpoints','photo','video','map','internet','handout','activities','ast','newsletter'];
        var resourceList = {};

        Prismic.ctx().then(function(ctx){
            var getResources = function(){
                $scope.tags.forEach(function(elm){
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
            } ;

            var getTags = function() {
                var query  = '[[:d = any(document.type, ["resource"])][:d = any(document.tags, ["youth"])]]';
                ctx.api.form('everything').query(query)
                    .ref(ctx.ref)
                        .submit(function(err, documents){
                            if (err) {
                                $log.error('error getting sponsor from prismic');
                            }
                            else {
                                documents.results.forEach(function(result){
                                    result.tags.forEach(function(tag){
                                        if($scope.tags.indexOf(tag) === -1 && tag != 'youth'){
                                            $scope.tags.push(tag);
                                        }
                                    })
                                })
                                getResources();
                            }
                        });
            }();


            var bookmarks = [['overview','youth-overview'],
                             ['programs','youth-programs'],
                             ['resource','youth-resource-text'],
                             ['curriculum','youth-curriculum']];

            bookmarks.forEach(function(bookmark){
                Prismic.bookmark(bookmark[1]).then(function(doc){
                    $scope[bookmark[0]] = doc.getStructuredText('generic.body').asHtml(ctx);
                });
            })

        });
  })
;
