'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.blogs', {
        url: '^/blogs',
        templateUrl: 'app/blogs/blogs.html',
        controller: 'BlogsCtrl'
      })
      .state('ac.blogsCategory', {
        url: '^/blogs/:category',
        templateUrl: 'app/blogs/blogs.html',
        controller: 'BlogsCtrl'
      })
      .state('ac.blogItem', {
        url: '^/blogs/:id/:slug',
        templateUrl: 'app/blogs/blogItem.html',
        controller: 'BlogItemCtrl'
      });

  });

