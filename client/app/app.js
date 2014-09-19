'use strict';

angular.module('avalancheCanadaApp', [
                'ngCookies',
                'ngResource',
                'ngSanitize',
                'ui.router',
                'ui.bootstrap'//,
                //'constants'
                ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
          .otherwise('/');

        $locationProvider.html5Mode(true);
    });

//    .run(function(ENV, $rootScope) {
        //! make env (environemnt constants) available globaly
        //$rootScope.env = ENV;
  //  })

