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
        controller: 'BlogItemCtrl',
        resolve:{
            id: function($stateParams){
                return $stateParams.id;
            },

            slug: function($stateParams){
                return $stateParams.slug;
            }
        }
      })
      .state('ac.spring', {
        url: '^/spring',
        templateUrl: 'app/blogs/blogItem.html',
        controller: 'BlogItemCtrl',
        resolve:{
            id: function($stateParams){
                return 'VSG7EScAACUAntS-';
            },

            slug: function($stateParams){
                return 'spring-overview';
            }
        }
      })
      .state('ac.springDr', {
        url: '^/springDr',
        templateUrl: 'app/blogs/blogItem.html',
        controller: 'BlogItemCtrl',
        resolve:{
            id: function($stateParams){
                return 'VSGIeycAACYAndeN';
            },

            slug: function($stateParams){
                return 'spring-strategy';
            }
        }
      })
      ;

  });

