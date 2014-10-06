'use strict';

angular.module('avalancheCanadaApp', [
                'ngCookies',
                'ngResource',
                'ngSanitize',
                'ui.router',
                'ui.bootstrap',
                'constants'
                ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
          .otherwise('/');

        $locationProvider.html5Mode(true);

        //! Prismic.io configuration
        PrismicProvider.setApiEndpoint('https://avalancheca.prismic.io/api');
        PrismicProvider.setAccessToken('');
        PrismicProvider.setClientId('');
        PrismicProvider.setClientSecret('');
        PrismicProvider.setLinkResolver(function(ctx, doc) {
            return '#/document/' + doc.id + '/' + doc.slug + ctx.maybeRefParam;
        });

    })

    .run(function(ENV, $rootScope) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;
    });











