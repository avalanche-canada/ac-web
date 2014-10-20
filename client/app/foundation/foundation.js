'use strict';

angular.module('foundation',[
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngRoute',
        'ui.bootstrap',
        'constants',
        'prismic.io'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/foundation', {
            templateUrl: 'app/foundation/intro.html',
            controller: 'IntroCtrl'
        })
        .when('/foundation/more', {
            templateUrl: 'app/foundation/more.html',
            controller: 'FoundationMoreCtrl'
        });
  });
