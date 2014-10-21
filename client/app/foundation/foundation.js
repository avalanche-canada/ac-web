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
 .config(function ($stateProvider) {
    $stateProvider
      .state('foundation', {
        abstract:true,
        url: '/foundation',
        templateUrl: 'app/foundation/foundation.html'
      })
      .state('foundation.intro', {
        url: '',
        templateUrl: 'app/foundation/intro.html'
      })
      .state('foundation.more', {
        url: '/more',
        templateUrl: 'app/foundation/more.html'
      });
  });
