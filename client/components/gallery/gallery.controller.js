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

.directive('acGallery', function(Cloudinary){
    return {
        restrict: 'E',
        templateUrl: 'components/gallery/gallery.element.html',
        scope: {},
        link: function(scope, elem, attrs) {
            scope.tag = attrs.tag;
            var rows    = attrs.rows || 4,
                columns = attrs.columns || 4;

            scope.pageNum = 1;

            var backwards_pages = [];
            var next_page = undefined;

            scope.next_page = function() {
              get_taged_images(next_page);
            };

            scope.prev_page = function() {
              next_page = backwards_pages.pop()

              get_taged_images(backwards_pages[backwards_pages.length-1]);
            };


            var get_taged_images = function(next_cursor) {
              var opts = {rows: rows, columns: columns, width: 200, height: 200 };
              if(typeof(next_cursor) !== 'undefined') {
                opts.next_cursor = next_cursor;
              }

              Cloudinary
                .getByTag(attrs.tag, opts)
                .then(function(result){
                    scope.imageList = result;

                    scope.rows = _.reduce(result.resources, function(acc, x, n){
                      if(n % columns === 0) {
                          acc.push([]);
                        }
                      _.last(acc).push(x);
                      return acc;
                    }, []);


                    if(typeof(next_page) !== 'undefined') {
                      backwards_pages.push(next_page);
                    }
                    next_page = result.next_cursor;

                    scope.pageNum = backwards_pages.length + 1;
                });
            };

            get_taged_images(next_page);

        }
    };
})
.factory('Cloudinary', function cloudinaryFactory($http) {

    var tagURL         = '/vendor/cloudinary/resources/image/tags/',
        resourcePrefix = 'http://res.cloudinary.com/avalanche-ca/image/upload/';

    var mapToSize = function(width, height) {
        return function(resource) {
                var transform = 'c_fill,h_'+height+',w_'+width;
                var thumb_url =  resourcePrefix + transform + '/' + resource.public_id + '.' + resource.format;
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
                    console.log( result.data );
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


