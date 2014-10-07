'use strict';

angular.module('avalancheCanadaApp')
.config(function ($routeProvider) {
  $routeProvider
        .when('/news', {
            templateUrl: 'app/news/news.html',
            controller: 'newsController'
        })

});


  /*.config(function ($stateProvider) {
    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'app/news/news.html',
        controller: 'NewsCtrl'
      });
  });*/
