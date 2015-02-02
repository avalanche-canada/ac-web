'use strict';

angular.module('avalancheCanadaApp')
  .controller('NewsCtrl', function ($scope, Prismic, $log, $stateParams, urlBuilder) {
    $scope.url = urlBuilder.get();
    $scope.tags = [];
    $scope.tagList = [];
    var query = '[:d = at(document.type, "news")]';
    var results;

    if ($stateParams.tag){
        query += '[:d = any(document.tags, ["'+$stateParams.tag+'"])]'
    }

    Prismic.ctx().then(function(ctx){
        $scope.ctx = ctx;

        var getContent = function(){
            $scope.featured = null;
            $scope.news = [];
            results.forEach(function(result){

                var checkTagList = function() {
                    return $scope.tags.some(function(tag){return result.tags.indexOf(tag) !== -1});
                };

                if($scope.tags.length === 0 || checkTagList())
                {
                    if (result.tags.indexOf("featured") >= 0 && $scope.featured === null){
                        $scope.featured = result;
                    }
                    else{
                        $scope.news.push(result);
                    }
                }
            });
        };

        $scope.tagSelected = function(tag){
            var index = $scope.tags.indexOf(tag)
            if (index === -1){
                $scope.tags.push(tag);
            }
            else{
                 $scope.tags.splice(index, 1);
            }

            getContent();
        };

        ctx.api.form('everything').query('[' + query + ']')
            .orderings('[my.news.date desc]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting news events from prismic');
            }
            else {
                results = documents.results;

                //! generate tag list by collating unique tags
                results.forEach(function(result){
                    result.tags.forEach(function(tag){
                        if($scope.tagList.indexOf(tag) === -1 ){
                            $scope.tagList.push(tag);
                        }
                    });
                });

                getContent();
            }
        });
    });



  });
