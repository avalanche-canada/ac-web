'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.youth', {
        url: '^/youth',
        templateUrl: 'app/youth/youth.html',
        controller: 'YouthCtrl',
        resolve:{
            overview: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('youth-overview').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            programs: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('youth-programs').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            resource: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('youth-resource-text').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            curriculum: function($q, Prismic){
                var deferred = $q.defer();
                Prismic.ctx().then(function(ctx){
                    Prismic.bookmark('youth-resource-text').then(function(doc){
                        deferred.resolve(doc.getStructuredText('generic.body').asHtml(ctx));
                    });
                });
                return deferred.promise;
            },

            resourceList: function($q, $log, Prismic){
                var deferred = $q.defer();
                var tags =  [];
                var resourceList = {};

                Prismic.ctx().then(function(ctx){

                    //! for each tag get the youth resources with that tag
                    var getResources = function(){
                        tags.forEach(function(elm){
                            var query  = '[[:d = any(document.type, ["resource"])][:d = any(document.tags, ["youth"])][:d = any(document.tags, ["'+elm+'"])]]';
                            $log.info(query);
                            ctx.api.form('everything').query(query)
                                    .ref(ctx.ref).submit(function(err, documents){
                                        if (err) {
                                            $log.error('error getting resource tags from prismic');
                                        }
                                        else {
                                            resourceList[elm] = documents.results;
                                        }
                            });
                        });
                        deferred.resolve({'list': resourceList, 'tags': tags});
                    } ;

                    //! Get all tags and then get the resources for each tag
                    var query  = '[[:d = any(document.type, ["resource"])][:d = any(document.tags, ["youth"])]]';
                    ctx.api.form('everything').query(query)
                        .ref(ctx.ref)
                            .submit(function(err, documents){
                                if (err) {
                                    $log.error('error getting resource from prismic');
                                }
                                else {
                                    //! add unique tags to the list
                                    documents.results.forEach(function(result){
                                        result.tags.forEach(function(tag){
                                            if(tags.indexOf(tag) === -1 && tag !== 'youth'){
                                                tags.push(tag);
                                            }
                                        });
                                    });
                                    getResources();
                                }
                            });
                });

                return deferred.promise;
            }
        }
      });
  })
  .controller('YouthCtrl', function ($scope, $log, $anchorScroll, $timeout, Prismic, overview, programs,resource, curriculum, resourceList) {
        $scope.overview = overview;
        $scope.programs = programs;
        $scope.resource = resource;
        $scope.curriculum = curriculum;
        $scope.tags = resourceList.tags;
        $scope.resourceList = resourceList.list;

        //! once rendered call anchor scroll
        $timeout($anchorScroll, 0, false);
  })
;
