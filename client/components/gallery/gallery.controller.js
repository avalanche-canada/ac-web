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

            Cloudinary
              .getByTag(attrs.tag, {rows: rows, columns: columns, width: 200, height: 200 })
              .then(function(result){
                  scope.imageList = result;

                  scope.rows = _.reduce(result, function(acc, x, n){
                    if(n % columns === 0) {
                        acc.push([]);
                      }
                    _.last(acc).push(x);
                    return acc;
                  }, []);

                  console.log(scope.rows);

              });
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
            var resources =  $http.get(tagURL + tag, {params: _.pick(params, 'max_results')})
                .then(function(result) {
                    return result.data.resources;
                });

            if(typeof(options) !== 'undefined') {
                resources = resources.then(function(resources){
                    return _.map(resources, mapToSize(options.width, options.height));
                });

            } else {
                resources = resources.then(function(resources) {
                    return _.map(resources, function(i) {
                        return {url: i.url};
                    });
                });
            }
            return resources;
        }
    };

})
.controller('GalleryCtrl', function($scope, Cloudinary, $stateParams){
    $scope.tag = $stateParams.tag;
});


