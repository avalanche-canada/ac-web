'use strict';

angular.module('avalancheCanadaApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngRoute',
        'ui.bootstrap',
        'constants',
        'prismic.io',
        'acMap'])

    .config(function ($locationProvider, PrismicProvider) {
        $locationProvider.html5Mode(true);

        //! Prismic.io configuration
        PrismicProvider.setApiEndpoint('https://avalancheca.prismic.io/api');
        PrismicProvider.setAccessToken('');
        PrismicProvider.setClientId('');
        PrismicProvider.setClientSecret('');
        PrismicProvider.setLinkResolver(function(ctx, documentLink) {
            var retVal = '';

            if (documentLink.isBroken) {
                $log.error('prismic link resolver documentLink.isBroken')
            }
            else
            {
                /* Static pages based on bookmark name of the document */
                if(documentLink.id == ctx.api.bookmarks['about']) {
                    retVal = '/about' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id == ctx.api.bookmarks['jobs']) {
                    retVal = '/jobs' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }

                /* Based on document type of the document */
                if(documentLink.type == 'events') {
                    retVal = '/events/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.type == 'news') {
                    retVal = '/news/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
            }

            return retVal;
            //return '#/document/' + doc.id + '/' + doc.slug + ctx.maybeRefParam;
        });

    })

    .run(function(ENV, $rootScope) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;
    });











