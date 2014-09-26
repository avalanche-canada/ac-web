'use strict';

angular.module('avalancheCanadaApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngRoute',
        'ui.bootstrap',
        'constants',
        'acMap'
    ])

    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })

    .run(function(ENV, $rootScope) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;
    });



