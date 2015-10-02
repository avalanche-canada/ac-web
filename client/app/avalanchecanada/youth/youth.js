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
                var grades_from = [];
                var grades_to = [];
                var resourceList = {};

                Prismic.ctx().then(function(ctx){
                    ctx.api.form('everything')
                        .query(['at', 'document.type', 'youth-resource'])
                        .pageSize(200)
                        .ref(ctx.ref).submit(function(err, documents){
                            if (err) {
                                $log.error('error getting resource tags from prismic');
                            }
                            else {
                                resourceList = documents.results.map(function(resource){
                                    return {'category':resource.getText('youth-resource.category'),
                                            'grade_to':   resource.getText('youth-resource.grade_to') ,
                                            'grade_from':   resource.getText('youth-resource.grade_from') ,
                                            'description': resource.getStructuredText('youth-resource.description').asText(ctx),
                                            'url': resource.getText('youth-resource.url'),
                                            'label':resource.getText('youth-resource.label')};
                                });
                                categories = _.sortBy(_.unique(resourceList.map(function(elm){
                                    return elm.category;
                                })));
                                deferred.resolve({'list': resourceList, 'categories':categories, 'grades_to': grades_to, 'grades_from': grades_from});
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
        $scope.selected_grade = {'from':null,'to':null};
        $scope.selected_category = null;

        $scope.filterGrades = ['k','1','2','3','4','5','6','7','8','9','10','11','12'];
        var gradeFilterMap = {'k':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':11,'12':12};

        var gradeComparison = function(source_from, source_to, filter_from, filter_to){
            if (source_from === 'All' || source_to === 'All'|| filter_from === 'All' || filter_to === 'All'){
                return true;
            }
            else if((gradeFilterMap[source_from] >= gradeFilterMap[filter_from] && gradeFilterMap[source_from] <= gradeFilterMap[filter_to])||
                    (gradeFilterMap[source_to] <= gradeFilterMap[filter_to] && gradeFilterMap[source_to] >= gradeFilterMap[filter_from])){
                    return true;
            }
            else{
                    return false;
            }
        };

        var applyFilter = function(){
            var list = [];
            youthResources.list.forEach(function(resource){
                var add = false;

                if(($scope.selected_grade.from === null || $scope.selected_grade.to === null) && $scope.selected_category === null){
                    add = true;
                }
                else{
                    if(resource.category === $scope.selected_category &&
                       ($scope.selected_grade.from === null || $scope.selected_grade.to === null)){
                        add = true;
                    }
                    else if($scope.selected_category === null &&
                       gradeComparison(resource.grade_from,resource.grade_to,$scope.selected_grade.from,$scope.selected_grade.to)){
                        add = true;
                    }
                    else if(resource.category === $scope.selected_category &&
                       gradeComparison(resource.grade_from,resource.grade_to,$scope.selected_grade.from,$scope.selected_grade.to)){
                        add = true;
                    }
                }

                if(add){
                    list.push(resource);
                }

            });
            $scope.resourceList = list;
        };

        $scope.selectGrade = function(type, grade){
            $scope.selected_grade[type] = grade;

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
