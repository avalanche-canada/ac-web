'use strict';

angular.module('acComponents').constant('AC_API_ROOT_URL', '');

//angular.module('avalancheCanadaApp.filters', []);
angular.module('avalancheCanadaApp', [
        'ngCookies',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'constants',
        'ngSanitize',
        'prismic.io',
        'acComponents',
        'foundation',
        'ngToast',
        'angular-storage',
        'auth0',
        'angular-jwt'
    ])

    // main module configuration
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider) {
        //! \todo *hack* set up $sce properly so that it doesnt remove iframes from prismic content
        $sceProvider.enabled(false);
        // enables html5 push state
        $locationProvider.html5Mode(true);
        // little hack for auth0 to be able to interpret social callbacks properlly
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        //! define abstract ac state
        $stateProvider
            .state('ac', {
                abstract: true,
                url: '/',
                templateUrl: 'app/template.html'
            });
    })

    // Prismic.io configuration
    .config(function (PrismicProvider) {

        PrismicProvider.setApiEndpoint('https://avalancheca.prismic.io/api');
        PrismicProvider.setAccessToken('');
        PrismicProvider.setClientId('');
        PrismicProvider.setClientSecret('');
        PrismicProvider.setLinkResolver(function(ctx, documentLink) {
            var link = '';

            if (documentLink.isBroken) {
                console.log.error('prismic link resolver documentLink.isBroken');
            } else {
                /* Static pages based on bookmark name of the document */
                if(documentLink.id === ctx.api.bookmarks.about) {
                    link = '/about' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id === ctx.api.bookmarks.jobs) {
                    link = '/jobs' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }

                /* Based on document type of the document */
                if(documentLink.type === 'events') {
                    link = '/events/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.type === 'news') {
                    link = '/news/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
            }

            return link;
        });

    })

    // ng toast configuration
    .config(['ngToastProvider', function(ngToast) {
        ngToast.configure({
          verticalPosition: 'top',
          horizontalPosition: 'center',
          maxNumber: 1
        });
    }])

    // auth0 configuration
    .config(function (authProvider, $httpProvider, jwtInterceptorProvider) {

        authProvider.init({
            domain: 'avalancheca.auth0.com',
            clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC'
        });

        function onLoginSucccess($location, profilePromise, idToken, store) {
            profilePromise.then(function(profile) {
              store.set('profile', profile);
              store.set('token', idToken);
            });

            // if we use the state service to go to the ac.submit state 
            // it doesn't remove the #access_token=... part of the url that comes back from auth0
            var loginRedirectUrl = store.get('loginRedirectUrl');
            if(loginRedirectUrl) {
                $location.url(loginRedirectUrl);
                store.remove('loginRedirectUrl');
            } else {
                $location.url('/');
            }
        }

        onLoginSucccess.$inject = ['$location', 'profilePromise', 'idToken', 'store', '$state', '$urlRouter'];

        authProvider.on('loginSuccess', onLoginSucccess);

        authProvider.on('logout', ['store', '$state', function onLogout(store, $state){
            store.remove('profile');
            store.remove('token');
            $state.go('ac.map');
        }]);

        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    config.skipAuthorization = /^https:\/\/avalancheca.prismic.io\/api/.test(config.url);
                    return config;
                }
            };
        });

        jwtInterceptorProvider.tokenGetter = ['store', function (store) {
            return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })

    .factory('urlBuilder', function ($state) {
        return {
            get: function () {
                return $state.href($state.current.name, $state.params, {absolute: true, inherit: true});
            }
        };
    })

    .run(function ($rootScope, auth, store, jwtHelper, $location, ENV, $state) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;

        $rootScope.$on('$stateChangeStart', function(event, toState){
            // makes sure login spans refreshes
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            }

            // using the native auth0 auth.hookEvents() does not work with the hack in 
            // the login success handler. Keeps cycling thought the root abstract state.
            if(toState.data && toState.data.requiresLogin && !auth.isAuthenticated) {
                event.preventDefault();
                $state.go('ac.login');
                store.set('loginRedirectUrl', toState.url);
            }
        });
    })

    .controller('HighlighCtrl', function (ngToast, Prismic, $log) {

        var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD');
        var tomorrow  = moment.utc(moment().startOf('day').add(1,'days')).format('YYYY-MM-DD');

        Prismic.ctx().then(function(ctx){

            var query =  '[[:d = at(document.type, "highlight")]';
                query += '[:d = date.before(my.highlight.start_date,"'+tomorrow+'")]';
                query += '[:d = date.after(my.highlight.end_date,"'+yesterday+'")]]';
            $log.debug(query);
            ctx.api.form('everything').query(query)
                    .ref(ctx.ref).submit(function(err, documents){
                if (err) {
                    $log.error('error getting highlight from prismic');
                }

                else {
                    var highlight = documents.results[0];
                    if(highlight){
                        ngToast.create({
                            'content': highlight.getStructuredText('highlight.description').asHtml(ctx),
                            'class': highlight.getText('highlight.style') || 'danger',
                            'dismissOnTimeout': false,
                            'dismissButton': true,
                            'dismissButtonHtml': '&times;'
                        });
                    }
                }

            });
        });
    });
