'use strict';

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
        'ngToast',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])

    // main module configuration                            
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider) {
        $sceProvider.enabled(false); //! \todo *hack* set up $sce properly so that it doesnt remove iframes from prismic content
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

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
            clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC',
            loginUrl: '/'
        });

        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log('Login Success');
            profilePromise.then(function(profile) {
              store.set('profile', profile);
              store.set('token', idToken);
            });
            $location.hash('');
            $location.path('/');
        });

        authProvider.on('authenticated', function() {
            console.log('Authenticated');
        });

        authProvider.on('logout', function(store) {
            store.remove('profile');
            store.remove('token');
        });

        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('token');
        }

        $httpProvider.interceptors.push('jwtInterceptor');
    })

    .run(function(ENV, $rootScope, $location, auth, store, jwtHelper) {
        //! make env (environemnt constants) available globaly
        $rootScope.env = ENV;

        // hooks routing requiresLogin data attribute
        auth.hookEvents();
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
