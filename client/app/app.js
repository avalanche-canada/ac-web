'use strict';

angular.module('acComponents').constant('AC_API_ROOT_URL', '');


//angular.module('avalancheCanadaApp.filters', []);
angular.module('avalancheCanadaApp', [
		'react',
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
        'angular-jwt',
        'datatables',
        'LocalStorageModule'
    ])

    // main module configuration
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider) {
        //! \todo *hack* set up $sce properly so that it doesnt remove iframes from prismic content
        $sceProvider.enabled(false);
        // enables html5 push state
        $locationProvider.html5Mode(true);
        // little hack for auth0 to be able to interpret social callbacks properlly
        $locationProvider.hashPrefix('!');

        //! warning this will only perform a soft 404. to perform a hard 404 check that the route does not exist in the express routes file
        $urlRouterProvider.otherwise('/404');

        $stateProvider

            .state('ac', {
                abstract: true,
                url: '/',
                templateUrl: 'app/avalanchecanada/template.html',
                data: {
                    ogTitle: 'Avalanche Canada',
                    ogImage: 'http://www.avalanche.ca/assets/avalanche_canada.png',
                    ogDescription: 'Avalanche Canada is a non-government, not-for-profit organization dedicated to public avalanche safety. We issue daily avalanche forecasts throughout the winter for much of the mountainous regions of western Canada, providing this free information via our website and our app, Avalanche Canada Mobile. We also coordinate and deliver avalanche awareness and education programs, provide curriculum and support to instructors of Avalanche Canada training programs, act as a central point-of-contact for avalanche information, and work closely with many different avalanche research projects, both at home and abroad.'
                },
            })
            .state('ac.404', {
                url: '^/404',
                templateUrl: 'app/404.html',
                controller: function($rootScope) {
                  $rootScope.metatags = [
                    {name: 'prerender-status-code', content: '404'}
                  ];
                }
            })
            .state('ac.error', {
                url: '^/error',
                templateUrl: 'app/error.html'
            })
            .state('mobileSplash', {
                url: '/mobileSplash',
                templateUrl: 'app/mobileSplash.html',
                controller: ['$scope','store', function($scope,store){
                    $scope.dest = store.get('dest') || 'ac.map';
                }]
            });
    })

    // Prismic.io configuration
    .config(function (PrismicProvider) {

        PrismicProvider.setApiEndpoint('https://karlguillotte.prismic.io/api');
        // PrismicProvider.setApiEndpoint('https://avalancheca.prismic.io/api');
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
                if(documentLink.type === 'blogs') {
                    link = '/blogs/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.type === 'weather-forecast') {
                    link = '/weather' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
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

    //client=web to all requests
    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                'request': function (config) {
                    var reqUrl = config.url;

                    if(config.method === 'GET' && (reqUrl.indexOf('submissions') !== -1 || reqUrl.indexOf('observations') !== -1 )){
                        config.url = config.url + '?client=web';
                    }
                    return config;
                }

            };
        });
    })

    .factory('urlBuilder', function ($state) {
        return {
            get: function () {
                return $state.href($state.current.name, $state.params, {absolute: true, inherit: true});
            }
        };
    })

    .run(function ($location, $log, $rootScope, $state, ENV, auth, jwtHelper, store) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;

        //! if on mobile redirect to splash if they have not been there before page on load
        //! user should only be taken to this mobile splash page the first time they visit the site
        //! save this redirect to user storage
        var android = navigator.userAgent.match(/Android/i);
        var ios     = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        if (!store.get('mobileSplash')){
            store.set('dest', $state.current.name);
            if (android || ios){
                $state.go('mobileSplash');
            }
            store.set('mobileSplash', true);
        }

        //! Listen for state errors and handle gracefully
        //! Capture any issues in the resolve functions
        $rootScope.$on('$stateChangeError', function(event) {
            $log.error('$stateChangeError', event);
            $state.go('ac.error');
        });

        //! Capture any missing states (404)
        $rootScope.$on('$stateNotFound', function(event, unfoundState){
            $log.error('$stateNotFound', unfoundState.to, event);
            $state.go('ac.404');
        });

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

            // add opengraph tags for the state
            $rootScope.ogTags  = [ {type: 'title', value: toState.data.ogTitle},
                         {type: 'image', value: toState.data.ogImage},
                         {type: 'description', value: toState.data.ogDescription} ];
        });
    })

    .controller('HighlighCtrl', function (ngToast, Prismic, $log) {

        var yesterday = moment.utc(moment().startOf('day').subtract(1,'days')).format('YYYY-MM-DD');
        var tomorrow  = moment.utc(moment().startOf('day').add(1,'days')).format('YYYY-MM-DD');

        Prismic.ctx().then(function(ctx){

            var query =  '[[:d = at(document.type, "highlight")]';
                query += '[:d = date.before(my.highlight.start_date,"'+tomorrow+'")]';
                query += '[:d = date.after(my.highlight.end_date,"'+yesterday+'")]]';
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
