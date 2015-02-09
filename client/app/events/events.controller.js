'use strict';

angular.module('avalancheCanadaApp')
  .controller('EventsCtrl', function ($scope, Prismic, $log, $stateParams, urlBuilder) {

    $scope.url = urlBuilder.get();
    $scope.tags = [];
    $scope.tagList = [];
    $scope.isCollapsed = true;
    var results = [];
    var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD');
    var query = '[:d = at(document.type, "event")]';
        query += '[:d = date.after(my.event.start_date,"'+yesterday+'")]';

    var filterContent = function(){
        $scope.featured = null;
        $scope.events   = [];
        results.forEach(function(result){

            var checkTagList = function() {
                return $scope.tags.some(function(tag){return result.tags.indexOf(tag) !== -1;});
            };

            if($scope.tags.length === 0 || checkTagList())
            {
                if (result.tags.indexOf('featured') >= 0 && $scope.featured === null){
                    $scope.featured = result;
                }
                else{
                    $scope.events.push(result);
                }
            }
        });
    };

    $scope.tagSelected = function(tag, index){

        var indexInTag = $scope.tags.indexOf(tag);
        if (indexInTag === -1){ // doesnt exist so add tag
            $scope.tagList[index].selected = true;
            $scope.tags.push(tag);
        }
        else{ //exists in list so remove tag
             $scope.tagList[index].selected = false;
             $scope.tags.splice(indexInTag, 1);
        }

        filterContent();
    };


    Prismic.ctx().then(function(ctx){
        $scope.ctx = ctx;

        var page = 1;
        var getContent = function (){
            ctx.api.form('everything').query('[' + query + ']')
                .page(page)
                .orderings('[my.event.start_date]')
                .ref(ctx.ref).submit(function(err, documents){
                    if (err) {
                        $log.error('error getting events from prismic');
                    }
                    else {
                        results = results.concat(documents.results);

                        //! generate tag list by collating unique tags
                        results.forEach(function(result){
                            result.tags.forEach(function(tag){
                                if($scope.tagList.every(function(listItem){return listItem.name !== tag; })){
                                    $scope.tagList.push({'name': tag, 'selected': ''});
                                }
                            });
                        });

                        if (page <= documents.total_pages){
                            page = page + 1;
                            getContent();
                        }
                        else{

                            //! If a tag was specified in the state then filter by it
                            if ($stateParams.tag){
                                var tagIndex = -1;
                                $scope.tagList.some(function(listItem, index){
                                    if(listItem.name === $stateParams.tag){
                                        tagIndex = index;
                                        return true;
                                    }
                                });
                                $scope.tagSelected($stateParams.tag, tagIndex);
                            }
                            else{//! no tag provided in state params run filter content
                                filterContent();
                            }

                        }
                    }
                });
        };

        getContent();
    });



  });

