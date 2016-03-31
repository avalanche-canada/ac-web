'use strict';
angular.module('avalancheCanadaApp')
.config(function (authProvider, $httpProvider, jwtInterceptorProvider) {

    authProvider.init({
        domain: 'avalancheca.auth0.com',
        clientID: 'mcgzglbFk2g1OcjOfUZA1frqjZdcsVgC',
    });

    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store){
        console.log('auth.js::loginSuccess');
        profilePromise.then(function(profile){
          store.set('profile', profile);
          store.set('token', idToken);
        });
    }]);

      authProvider.on('authenticated', function() {
        console.log('auth.js::authenticated');
        // This is after a refresh of the page
        // If the user is still authenticated, you get this event
      });

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
});
