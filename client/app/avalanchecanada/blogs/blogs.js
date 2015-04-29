'use strict';

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.blogs', {
        url: '^/blogs',
        templateUrl: 'app/avalanchecanada/blogs/blogs.html',
        controller: 'BlogsCtrl'
      })
      .state('ac.blogsCategory', {
        url: '^/blogs/:category',
        templateUrl: 'app/avalanchecanada/blogs/blogs.html',
        controller: 'BlogsCtrl'
      })
      .state('ac.blogItem', {
        url: '^/blogs/:id/:slug',
        templateUrl: 'app/avalanchecanada/blogs/blogItem.html',
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
        templateUrl: 'app/avalanchecanada/blogs/blogItem.html',
        controller: 'BlogItemCtrl',
        resolve:{
            id: function(){
                return 'VSG7EScAACUAntS-';
            },

            slug: function(){
                return 'spring-overview';
            }
        }
      })
      .state('ac.springDr', {
        url: '^/springDr',
        templateUrl: 'app/avalanchecanada/blogs/blogItem.html',
        controller: 'BlogItemCtrl',
        resolve:{
            id: function(){
                return 'VSGIeycAACYAndeN';
            },

            slug: function(){
                return 'spring-strategy';
            }
        }
      })
      ;

  });

