'use strict';

angular.module('avalancheCanadaApp')
.config(function ($routeProvider) {
  $routeProvider
        .when('/blogs', {
            templateUrl: 'app/blogs/blogs.html',
            controller: 'BlogsCtrl'
        })

        .when('/blogs/:id/:slug', {
            templateUrl: 'app/blogs/blogItem.html',
            controller: 'BlogCtrl'
        });

});

