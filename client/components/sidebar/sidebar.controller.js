'use strict';

angular.module('avalancheCanadaApp')
  .controller('SidebarCtrl', function ($scope, Prismic, urlBuilder) {
    $scope.url = urlBuilder.get();
    $scope.items = [];
    Prismic.ctx().then(function(ctx){

        $scope.ctx = ctx;
        var query = '[[:d = any(document.tags, ["featured"])]]';
        ctx.api.form('everything').query(query)
            //.orderings('[my.news.date desc, my.blog.date desc, my.event.start_date]')
                .ref(ctx.ref).submit(function(err, documents){
            if (err) {
                $log.error('error getting blogs events from prismic');
            }
            else {
                var items = [];

                _.forEach(documents.results, function(item){
                    switch(item.type){
                        case 'blog':
                            items.push({
                                'title': 'Blog&mdash;' + item.getText('blog.title'),
                                'link': '/blogs/'+ item.id + '/' + item.slug,
                                'date': moment(item.getDate('blog.date'))
                            });
                            break;
                        case 'news':
                            items.push({
                                'title': 'News&mdash;' + item.getText('news.title'),
                                'link': '/news/'+ item.id + '/' + item.slug,
                                'date': moment(item.getDate('news.date'))
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

                items = _.sortBy(items, function(ob){return ob.date;});
                items = items.reverse();
                items = items.slice(0,5);
                items.push({'title': 'Daily Mountain Weather Forecast',
                            'link': '/weather'});
                items.push({'title': 'Submit Mountain Information',
                            'link': '/submit'});
                items.push({'title': 'Upcoming Events',
                            'link': '/events'});

                $scope.items = items;

            }
        });
    });

  });
