'use strict';

angular.module('avalancheCanadaApp')

.config(function ($stateProvider) {
    $stateProvider
    .state('ac.gallery', {
        url: '^/gallery/{tag}',
        templateUrl: 'components/gallery/gallery.html',
        controller: 'GalleryCtrl'
    });
})

.directive('acGallery', function(Cloudinary, $log){
    return {
        restrict: 'E',
        templateUrl: 'components/gallery/gallery.element.html',
        scope: {},
        link: function(scope, elem, attrs) {
            scope.tag = attrs.tag;
            var rows    = attrs.rows    || 4,
                columns = attrs.columns || 4,
                width   = attrs.width   || 200,
                height  = attrs.height  || 200;

            var pageNum = 0;
            var page_stack = [];

            scope.next_page = function() {
                pageNum++;
                goto_page(pageNum, page_stack);
            };

            scope.prev_page = function() {
                pageNum--;
                pageNum = pageNum < 0
                   ? 0
                   : pageNum; 
                goto_page(pageNum, page_stack);
            };


            var get_taged_images = function(next_cursor) {
              var opts = {rows: rows, columns: columns, width: width, height: height };
              if(typeof(next_cursor) !== 'undefined') {
                opts.next_cursor = next_cursor;
              }

              return Cloudinary
                .getByTag(attrs.tag, opts)
                .then(function(result){
                    var ret = {};
                    ret.next_cursor = result.next_cursor;

                    ret.rows = _.reduce(result.resources, function(acc, x, n){
                      if(n % columns === 0) {
                          acc.push([]);
                        }
                      _.last(acc).push(x);
                      return acc;
                    }, []);
                    return ret;

                });
            };
            
            var goto_page = function(n, stack) {
                if (stack.length == 0) {
                    get_taged_images()
                        .then(function(res) {
                            stack.push(res);
                            scope.rows = res.rows;
                        });
                } else if (n >= stack.length) {
                    var c = stack[stack.length-1].next_cursor
                    get_taged_images(c)
                        .then(function(res) {
                            stack.push(res);
                            scope.rows = res.rows;
                        });
                } else if( n >=0 && n < stack.length) {
                    scope.rows = stack[n].rows;
                } else {
                    $log.warn('Page number out of range. pageNum:', n, 'stack:', stack);
                }

            }

            goto_page(0, page_stack);

        }
    };
})
.factory('Cloudinary', function cloudinaryFactory($http) {

    var tagURL         = '/vendor/cloudinary/resources/image/tags/',
        resourcePrefix = 'http://res.cloudinary.com/avalanche-ca/image/upload/';

    var mapToSize = function(width, height) {
        return function(resource) {
                var transform = 'c_fill,h_'+height+',w_'+width;
                var thumb_url =  resourcePrefix + transform + '/' + resource.public_id + '.' + 'png';
                return {url: resource.url, thumbnail: thumb_url};
        };
    };

    return {
        getByTag: function(tag, options) {
            var _defaults = {
                rows: 4,
                columns: 4,
            };
            var params = _.extend(_defaults, options);
            params.max_results = params.rows * params.columns;
            var data =  $http.get(tagURL + tag, {params: _.pick(params, 'max_results', 'next_cursor')})
                .then(function(result) {
                    return result.data;
                });

            if(typeof(options) !== 'undefined') {
                data = data.then(function(data){
                    return { 
                      next_cursor: data.next_cursor,
                      resources: _.map(data.resources, mapToSize(options.width, options.height))
                    };
                });

            } else {
                data = data.then(function(data) {
                    return { 
                      next_cursor: data.next_cursor,
                      resources:  _.map(data.resources, function(i) {
                        return {url: i.url};
                    })};
                });
            }
            return data;
        }
    };

})
.controller('GalleryCtrl', function($scope, Cloudinary, $stateParams){
    $scope.tag = $stateParams.tag;
});


