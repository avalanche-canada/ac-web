'use strict';
/*
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

});*/

angular.module('avalancheCanadaApp')
.config(function ($stateProvider) {
    $stateProvider
      .state('ac.events', {
        url: '^/events',
        templateUrl: 'app/avalanchecanada/events/events.html',
        controller: 'EventsCtrl'
      })
      .state('ac.eventsFilter', {
        url: '^/events/:tag',
        templateUrl: 'app/avalanchecanada/events/events.html',
        controller: 'EventsCtrl'
      })
      .state('ac.eventDetail', {
        url: '^/events/{id}/{slug}',
        templateUrl: 'app/avalanchecanada/events/eventDetail.html',
        controller: 'EventDetailCtrl'
      });

});
