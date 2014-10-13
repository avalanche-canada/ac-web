'use strict';

angular.module('avalancheCanadaApp')
.config(function ($routeProvider) {
  $routeProvider
        .when('/events', {
            templateUrl: 'app/events/events.html',
            controller: 'EventsCtrl'
        })

        .when('/events/:id/:slug', {
            templateUrl: 'app/events/eventDetail.html',
            controller: 'EventDetailCtrl'
        });

});


  /*.config(function ($stateProvider) {
    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'app/news/news.html',
        controller: 'NewsCtrl'
      });
  });*/
