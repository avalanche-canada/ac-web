'use strict';

// todo: move this somewhere else, also tooltips are buggy, keeps flickering
// $('body').tooltip({
//     selector: 'a[rel="tooltip"], [data-toggle="tooltip"]'
// });

angular.module('avalancheCanadaApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'constants',
        'ngSanitize',
        'prismic.io',
        'acComponents',
        'foundation',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])


    .config(function ($locationProvider, PrismicProvider, $stateProvider, $urlRouterProvider, $sceProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

        $sceProvider.enabled(false); //! \todo *hack* set up $sce properly so that it doesnt remove iframes from prismic content

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        //! define abstract ac state
        $stateProvider
            .state('ac', {
                abstract: true,
                url: '/',
                templateUrl: 'app/template.html'
            })
        ;

        //! Prismic.io configuration
        PrismicProvider.setApiEndpoint('https://avalancheca.prismic.io/api');
        PrismicProvider.setAccessToken('');
        PrismicProvider.setClientId('');
        PrismicProvider.setClientSecret('');
        PrismicProvider.setLinkResolver(function(ctx, documentLink) {
            var retVal = '';

            if (documentLink.isBroken) {
                console.log.error('prismic link resolver documentLink.isBroken');
            }
            else
            {
                /* Static pages based on bookmark name of the document */
                if(documentLink.id === ctx.api.bookmarks.about) {
                    retVal = '/about' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id === ctx.api.bookmarks.jobs) {
                    retVal = '/jobs' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }

                /* Based on document type of the document */
                if(documentLink.type === 'events') {
                    retVal = '/events/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.type === 'news') {
                    retVal = '/news/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
            }

            return retVal;
        });

        authProvider.init({
            domain: 'avalancheca.auth0.com',
            clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC'
        });

        jwtInterceptorProvider.tokenGetter = function(store) {
            // Return the saved token
            return store.get('token');
        }

        $httpProvider.interceptors.push('jwtInterceptor');

    })

    .run(function(ENV, $rootScope, $location, auth, store, jwtHelper) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;

        auth.hookEvents();

        $rootScope.$on('$locationChangeStart', function() {
            if (!auth.isAuthenticated) {
              var token = store.get('token');
              if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                  auth.authenticate(store.get('profile'), token);
                } else {
                  // Either show Login page or use the refresh token to get a new idToken
                  $location.path('/');
                }
              }
            }
        });
    })

    .controller('AlertCtrl', function ($scope) {
        $scope.alert = { type: 'danger', msg: 'SPAW Example !' };
    //{ type: 'success', msg: 'Well done! You successfully read this important alert message.
    })
;











