'use strict';

angular.module('avalancheCanadaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'app/news/news.html',
        controller: 'NewsCtrl'
      });
  });