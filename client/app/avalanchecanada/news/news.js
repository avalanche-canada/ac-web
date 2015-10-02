'use strict';
/*

.config(function ($routeProvider) {
  $routeProvider
        .when('/news', {
            templateUrl: 'app/news/news.html',
            controller: 'NewsCtrl'
        })

        .when('/news/:id/:slug', {
            templateUrl: 'app/news/newsItem.html',
            controller: 'NewsItemCtrl'
        });

});
*/
angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.newsTagged', {
        url: '^/news/{tag}',
        templateUrl: 'app/avalanchecanada/news/news.html',
        controller: 'NewsCtrl'
      })
      .state('ac.news', {
        url: '^/news',
        templateUrl: 'app/avalanchecanada/news/news.html',
        controller: 'NewsCtrl'
      })
      .state('ac.newsItem', {
        url: '^/news/{id}/{slug}',
        templateUrl: 'app/avalanchecanada/news/newsItem.html',
        controller: 'NewsItemCtrl'
      });
  });
