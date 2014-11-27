'use strict';

// todo: move this somewhere else, also tooltips are buggy, keeps flickering
// $('body').tooltip({
//     selector: 'a[rel="tooltip"], [data-toggle="tooltip"]'
// });

angular.module('acComponents').constant('AC_API_ROOT_URL', '');

//angular.module('avalancheCanadaApp.filters', []);
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
        'ngToast'
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])

    .config(function ($locationProvider, PrismicProvider, $stateProvider, $urlRouterProvider, $sceProvider, authProvider) {

        //! \todo *hack* set up $sce properly so that it doesnt remove iframes from prismic content
        $sceProvider.enabled(false);
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!')

        authProvider.init({
            domain: 'avalancheca.auth0.com',
            clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC',
            loginUrl: '/'
        });

        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log("Login Success");
            profilePromise.then(function(profile) {
              store.set('profile', profile);
              store.set('token', idToken);
            });
            $location.hash('');
            $location.path('/');
        });

        authProvider.on('authenticated', function($location) {
            console.log("Authenticated");
        });

        authProvider.on('logout', function(store) {
            store.remove('profile');
            store.remove('token');
        });

        //$uiViewScrollProvider.defaultScroll = 'anchor';
        $uiViewScrollProvider.useAnchorScroll();
        //$anchorScrollProvider.disableAutoScrolling();
        $urlRouterProvider.otherwise('/');

        //! define abstract ac state
        $stateProvider
            .state('ac', {
                abstract: true,
                url: '/',
                templateUrl: 'app/template.html',
                controller: ['$scope','$state',  function($scope, $state){
                    $scope.url = $state.href($state.current.name, $state.params, {absolute: true, inherit: true});
                }]
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

    })


    .config(['ngToastProvider', function(ngToast) {
        //! ng toast configuration
        ngToast.configure({
          verticalPosition: 'top',
          horizontalPosition: 'center',
          maxNumber: 1
        });
    }])

    // .config(['$httpProvider', 'jwtInterceptorProvider', function ($httpProvider, jwtInterceptorProvider) {
    //     jwtInterceptorProvider.tokenGetter = function(store) {
    //         // Return the saved token
    //         return store.get('token');
    //     };

    //     $httpProvider.interceptors.push('jwtInterceptor');
    // }])

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
