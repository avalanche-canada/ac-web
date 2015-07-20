'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('ac.youth', {
        url: '^/youth',
        templateUrl: 'app/avalanchecanada/youth/youth.html',
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

            youthResources: function($q, $log, Prismic){
                var deferred = $q.defer();
                var categories = [];
                var grades = [];
                var resourceList = {};

                Prismic.ctx().then(function(ctx){
                    var query  = '[[:d = any(document.type, ["youth-resource"])]]';
                    $log.info(query);
                    ctx.api.form('everything').query(query)
                        .ref(ctx.ref).submit(function(err, documents){
                            if (err) {
                                $log.error('error getting resource tags from prismic');
                            }
                            else {
                                resourceList = documents.results;
                                categories = _.unique(resourceList.map(function(elm){
                                    return elm.getText('youth-resource.category');
                                }));
                                grades = _.unique(resourceList.map(function(elm){
                                    return elm.getText('youth-resource.grade');
                                }));
                                deferred.resolve({'list': resourceList, 'categories':categories, 'grades': grades });
                            }
                    });

                });

                return deferred.promise;
            }
        }
      });
  })
  .controller('YouthCtrl', function ($scope, $log, $anchorScroll, $timeout, Prismic, overview, programs,resource, curriculum, youthResources) {
        $scope.overview = overview;
        $scope.programs = programs;
        $scope.resource = resource;
        $scope.curriculum = curriculum;
        $scope.resourceList = youthResources.list;
        $scope.resourceCategories = youthResources.categories;
        $scope.resourceGrades = youthResources.grades;
        $scope.selected_grade = null;
        $scope.selected_category = null;

        var applyFilter = function(){
            var list = [];
            youthResources.list.forEach(function(resource){
                var add = false;

                if($scope.selected_grade === null && $scope.selected_category === null){
                    add = true;
                }
                else{
                    if(resource.getText('youth-resource.category') === $scope.selected_category &&
                       $scope.selected_grade === null){
                        add = true;
                    }
                    else if($scope.selected_category === null &&
                       resource.getText('youth-resource.grade') === $scope.selected_grade){
                        add = true;
                    }
                    else if(resource.getText('youth-resource.category') === $scope.selected_category &&
                       resource.getText('youth-resource.grade') === $scope.selected_grade){
                        add = true;
                    }
                }

                if(add){
                    list.push(resource);
                }

            });
            $scope.resourceList = list;
        };

        $scope.selectGrade = function(grade){
            $scope.selected_grade = grade;
            applyFilter();
        };

        $scope.selectCategory = function(category){
            $scope.selected_category = category;
            applyFilter();
        };

        //! once rendered call anchor scroll
        $timeout($anchorScroll, 0, false);
  })
;
