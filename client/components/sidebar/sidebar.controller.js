'use strict';

angular.module('avalancheCanadaApp')
  .controller('SidebarCtrl', function ($scope, Prismic) {

    $scope.items = [];
    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        var query = '[[:d = any(document.tags, ["featured"])]]';
        ctx.api.form('everything').query(query)
            .orderings('[my.blog.date desc, my.event.start_date, my.news.date desc]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting blogs events from prismic');
            }
            else {
                var items = documents.results.slice(0,5);

                _.forEach(items, function(item){
                    switch(item.type){
                        case 'blog':
                            $scope.items.push({
                                'title': item.getText('blog.title'),
                                'link': '/blogs/'+ item.id + '/' + item.slug
                            });
                            break;
                        case 'news':
                            $scope.items.push({
                                'title': item.getText('news.title'),
                                'link': '/news/'+ item.id + '/' + item.slug
                            });
                            break;
                        case 'event':
                            //! \todo do we want to include events ??
                            /*$scope.items.push({
                                'title': item.getText('event.title'),
                                'link': '/events/'+ item.id + '/' + item.slug
                            });*/
                            break;
                    }
                });

            }
        });
    });

  });
